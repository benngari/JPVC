export default function Terms() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-serif text-4xl font-bold">Terms of Service</h1>
      <p className="mt-2 text-sm text-ink/50 dark:text-cream/50">Last updated: June 2026</p>

      <div className="mt-8 space-y-8 text-ink/70 dark:text-cream/70 leading-relaxed">
        <Block title="Acceptance of Terms">
          By using this website and member portal, you agree to these terms. If you do not agree,
          please do not use our services.
        </Block>
        <Block title="Member Portal">
          The portal is provided for JPVC members to manage their account and giving. You are
          responsible for keeping your login credentials confidential.
        </Block>
        <Block title="Giving">
          All gifts made through this platform are voluntary donations to Jesus Prophetic Vision
          Church. Gifts are non-refundable except at the sole discretion of church leadership.
        </Block>
        <Block title="AI Companion">
          The Spiritual Companion is an AI-powered tool for biblical exploration and encouragement.
          It is not a substitute for pastoral counseling, prayer, or human spiritual guidance.
          Always consult a pastor or elder for serious spiritual matters.
        </Block>
        <Block title="Prohibited Use">
          You may not use this platform for any unlawful purpose, to harass others, or to transmit
          harmful content. We reserve the right to terminate access for violations.
        </Block>
        <Block title="Contact">
          Questions about these terms? Reach us at{' '}
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
