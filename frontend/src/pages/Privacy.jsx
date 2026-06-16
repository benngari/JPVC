export default function Privacy() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-serif text-4xl font-bold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-ink/50 dark:text-cream/50">Last updated: June 2026</p>

      <div className="mt-8 space-y-8 text-ink/70 dark:text-cream/70 leading-relaxed">
        <Block title="Information We Collect">
          We collect your name, phone number, and password when you register for the member portal.
          We also record giving transactions you initiate through the platform.
        </Block>
        <Block title="How We Use Your Information">
          Your information is used solely to provide portal access, process gifts, and send you
          relevant church communications. We do not sell or share your data with third parties.
        </Block>
        <Block title="M-Pesa Payments">
          Payment processing is handled through Safaricom's M-Pesa Daraja API. We do not store
          your M-Pesa PIN or full card details. Transaction records are stored securely to provide
          your giving history.
        </Block>
        <Block title="Data Security">
          Passwords are hashed and never stored in plain text. All API communications are secured
          with JWT authentication. We take reasonable precautions to protect your data.
        </Block>
        <Block title="Contact Us">
          For questions about this policy, email us at{' '}
          <a
            href="mailto:jesuspropheticvisionchurch@gmail.com"
            className="text-accent hover:underline"
          >
            jesuspropheticvisionchurch@gmail.com
          </a>
          .
        </Block>
      </div>
    </section>
  )
}

function Block({ title, children }) {
  return (
    <div>
      <h2 className="font-serif text-xl font-bold text-ink dark:text-cream">{title}</h2>
      <p className="mt-2">{children}</p>
    </div>
  )
}
