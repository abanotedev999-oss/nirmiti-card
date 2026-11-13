import { Component, computed, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { CONTACTS, Lang, PROFILE, QUICK_DIAL, TEXT } from './profile.data';

interface Floater { ch: string; left: number; top: number; size: number; color: string; delay: number; }
interface Burst { id: number; ch: string; left: number; top: number; size: number; color: string; dx: string; dy: string; rot: string; }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly profile = PROFILE;
  readonly contacts = CONTACTS;
  readonly quickDial = QUICK_DIAL;

  // ---- language switch (English / Marathi) ----
  readonly lang = signal<Lang>('en');
  readonly t = computed(() => TEXT[this.lang()]);
  setLang(l: Lang) { this.lang.set(l); }

  // ---- floating hearts & sparkles in the background ----
  readonly floaters: Floater[] = Array.from({ length: 9 }, (_, i) => ({
    ch: ['♡', '✦', '♡', '✧'][i % 4],
    left: 8 + i * 10,
    top: 300 + (i % 3) * 260,
    size: 14 + (i % 3) * 5,
    color: i % 2 ? '#fff' : '#b89ae0',
    delay: i * 1.1,
  }));

  // ---- heart burst when the photo is tapped ----
  readonly bursts = signal<Burst[]>([]);
  private burstId = 0;

  burst(ev: Event) {
    const r = (ev.currentTarget as HTMLElement).getBoundingClientRect();
    const made: Burst[] = Array.from({ length: 10 }, (_, i) => ({
      id: ++this.burstId,
      ch: i % 3 ? '♡' : '♥',
      left: r.left + r.width / 2 + (Math.random() * 80 - 40),
      top: r.top + r.height / 2,
      size: 14 + Math.random() * 14,
      color: i % 2 ? '#c2536a' : '#9b82cf',
      dx: `${Math.random() * 120 - 60}px`,
      dy: `${-120 - Math.random() * 120}px`,
      rot: `${Math.random() * 60 - 30}deg`,
    }));
    this.bursts.update(b => [...b, ...made]);
    const ids = new Set(made.map(m => m.id));
    setTimeout(() => this.bursts.update(b => b.filter(x => !ids.has(x.id))), 1500);
  }

  // ---- toast ----
  readonly toastMsg = signal('');
  readonly toastOn = signal(false);
  readonly fabOpen = signal(false);
  toggleFab(): void { this.fabOpen.update(v => !v); }
  private toastTimer?: ReturnType<typeof setTimeout>;
  toast(msg: string) {
    this.toastMsg.set(msg);
    this.toastOn.set(true);
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toastOn.set(false), 3000);
  }

  // ---- actions ----
  saveContact() {
    const p = this.profile;
    const vcard = [
      'BEGIN:VCARD', 'VERSION:3.0',
      `FN:${p.name}`, `N:${p.name.split(' ').reverse().join(';')};;;`,
      `TEL;TYPE=CELL:${p.phone}`, `EMAIL:${p.email}`,
      `NOTE:Blood group ${p.bloodGroup}. Emergency: ${this.contacts.slice(0, 2).map(c => `${c.name} ${c.phone}`).join(' / ')}`,
      'END:VCARD',
    ].join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([vcard], { type: 'text/vcard' }));
    a.download = `${p.name.replace(' ', '_')}.vcf`;
    document.body.appendChild(a); a.click(); a.remove();
    this.toast('Contact file downloaded');
  }

  shareLocation() {
    if (!navigator.geolocation) { this.toast('Location is not available on this device'); return; }
    this.toast('Getting location…');
    navigator.geolocation.getCurrentPosition(
      pos => {
        const link = `https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`;
        const msg = `I found ${this.profile.name.split(' ')[0]}’s emergency card. Her location: ${link}`;
        window.open(`https://wa.me/${this.profile.primaryContact.phone.replace('+', '')}?text=${encodeURIComponent(msg)}`, '_blank');
      },
      () => this.toast('Please allow location access'),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  async sharePage() {
    const data = { title: `${this.profile.name} – Emergency Info`, text: 'Emergency info page', url: location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else { await navigator.clipboard.writeText(location.href); this.toast('Link copied'); }
    } catch { /* user cancelled */ }
  }

  waLink(phone: string) { return `https://wa.me/${phone.replace('+', '')}`; }
}