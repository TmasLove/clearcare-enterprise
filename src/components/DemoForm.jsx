import { useState } from 'react';
import { validateLead } from '../lib/validateLead';
import { submitLead } from '../lib/leads';
import Button from './Button';
import styles from './DemoForm.module.css';

const SEGMENTS = [
  { v: 'employers', l: 'Employer / Small Business' },
  { v: 'tpa', l: 'TPA / Health Plan Admin' },
  { v: 'dso', l: 'DSO / Dental Group' },
  { v: 'associations', l: 'Association / Member Group' },
  { v: 'whiteLabel', l: 'White-Label / Reseller' },
  { v: 'other', l: 'Other' },
];

export default function DemoForm({ defaultSegment = 'other', sourcePage = 'demo' }) {
  const [form, setForm] = useState({ name:'', email:'', phone:'', company:'', companySize:'1-50', segment: defaultSegment, message:'' });
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle'); // idle | submitting | done
  const [delivered, setDelivered] = useState(true);
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    const v = validateLead(form);
    if (!v.ok) { setErrors(v.errors); return; }
    setErrors({}); setState('submitting');
    const r = await submitLead({ ...form, sourcePage, sourceAction: 'demo' });
    setDelivered(r.delivered); setState('done');
  }

  if (state === 'done') {
    return (
      <div className={styles.done}>
        <h3>Thanks — we’ll be in touch shortly.</h3>
        <p>{delivered
          ? 'Our enterprise team has your request and will reach out within one business day.'
          : 'Your request is recorded. If you need us sooner, email enterprise@clearcaredentalgroup.com.'}</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.row}>
        <Field label="Full name" err={errors.name}><input value={form.name} onChange={set('name')} /></Field>
        <Field label="Work email" err={errors.email}><input value={form.email} onChange={set('email')} /></Field>
      </div>
      <div className={styles.row}>
        <Field label="Phone"><input value={form.phone} onChange={set('phone')} /></Field>
        <Field label="Company" err={errors.company}><input value={form.company} onChange={set('company')} /></Field>
      </div>
      <div className={styles.row}>
        <Field label="Company size">
          <select value={form.companySize} onChange={set('companySize')}>
            <option value="1-50">1-50</option><option value="51-200">51-200</option><option value="201-1000">201-1000</option><option value="1000+">1000+</option>
          </select>
        </Field>
        <Field label="You are a…">
          <select value={form.segment} onChange={set('segment')}>
            {SEGMENTS.map(s => <option key={s.v} value={s.v}>{s.l}</option>)}
          </select>
        </Field>
      </div>
      <Field label="What are you looking to solve?"><textarea rows={4} value={form.message} onChange={set('message')} /></Field>
      <Button type="submit">{state === 'submitting' ? 'Sending…' : 'Book a demo'}</Button>
    </form>
  );
}
function Field({ label, err, children }) {
  return (<label className={styles.field}><span>{label}</span>{children}{err && <em className={styles.err} role="alert">{err}</em>}</label>);
}
