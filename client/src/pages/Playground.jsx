import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Modal from '../components/ui/Modal'
import Skeleton from '../components/ui/Skeleton'
import Avatar from '../components/ui/Avatar'
import ProgressBar from '../components/ui/ProgressBar'
import { useState } from 'react'

export default function Playground() {
  const [modal, setModal] = useState(false)
  return (
    <div style={{ padding: '88px 32px', display: 'flex', flexDirection: 'column', gap: 32 }}>
      <h1>Component Playground (dev only)</h1>
      <section>
        <h2>Buttons</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 12 }}>
          <Button>Primary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>
      <section>
        <h2>Cards</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginTop: 12 }}>
          <Card>Normal Card</Card>
          <Card hover>Hover Card (lift effect)</Card>
        </div>
      </section>
      <section>
        <h2>Skeletons</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 300, marginTop: 12 }}>
          <Skeleton height="20px" />
          <Skeleton height="14px" width="60%" />
          <Skeleton height="80px" borderRadius="12px" />
        </div>
      </section>
      <section>
        <h2>Avatars</h2>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 12 }}>
          <Avatar name="Alice Johnson" size="sm" />
          <Avatar name="Bob Smith" size="md" />
          <Avatar name="Charlie Doe" size="lg" />
        </div>
      </section>
      <section>
        <h2>Progress Bars</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400, marginTop: 12 }}>
          <ProgressBar value={30} />
          <ProgressBar value={65} color="var(--gold)" showLabel />
          <ProgressBar value={90} color="var(--success)" showLabel />
        </div>
      </section>
      <section>
        <h2>Modal</h2>
        <Button onClick={() => setModal(true)}>Open Modal</Button>
        <Modal isOpen={modal} onClose={() => setModal(false)}>
          <h2>Example Modal</h2>
          <p style={{ color: 'var(--text-muted)', margin: '12px 0' }}>Press Escape or click outside to close.</p>
          <Button onClick={() => setModal(false)}>Close</Button>
        </Modal>
      </section>
    </div>
  )
}
