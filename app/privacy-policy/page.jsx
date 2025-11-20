import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <section className="container mx-auto my-32 p-5">
        <h2 className="text-4xl mb-8">Privacy statement</h2>

        <h3 className="text-xl mt-8 mb-4">
          SECTION 1 - WHAT DO WE DO WITH YOUR INFORMATION?
        </h3>
        <p>
          When you purchase something from our store, as part of the buying and
          selling process, we collect the personal information you give us such
          as your name, address, and email address. When you browse our store
          or use our Expo app, we also automatically receive your device IP
          address to help us learn about your browser, operating system, and
          app usage.
        </p>
        <p>
          Within the app, we may collect information about the features you use,
          the screen interactions you make, and any in app events (for example,
          vendor searches or image uploads). This usage data helps us improve
          our product and deliver a better experience—but we never share it
          with anyone outside our organization.
        </p>

        <h3 className="text-xl mt-8 mb-4">SECTION 2 - CONSENT</h3>
        <p>
          By using our website or Expo app, you consent to the collection and
          use of this information as described here. If we ever ask for your
          personal information for a new purpose—like email marketing
          promotions—you will be given the chance to opt in or out at that time.
        </p>
        <p>
          To withdraw consent for marketing communications, or for any questions
          about your personal data, contact us at{' '}
          <a href="mailto:support@designopolis.co.in">support@designopolis.co.in</a>{' '}
          or mail us at: 2nd floor, Geetanjali Complex, Sevoke Road, Siliguri
          734001.
        </p>

        <h3 className="text-xl mt-8 mb-4">SECTION 3 - DISCLOSURE</h3>
        <p>
          We will never sell or rent your personal information to third parties.
          The only exception is our crash-reporting partner, <strong>Sentry</strong>,
          which receives anonymized crash reports and error logs solely to help
          us identify and fix bugs in our app. Apart from Sentry, we do not
          share any data—personal or usage—with any outside entity.
        </p>
        <p>
          We may also disclose your personal information if required by law or
          to protect our rights under our Terms of Service.
        </p>

        <h3 className="text-xl mt-8 mb-4">SECTION 4 - PAYMENT</h3>
        <p>
          We use Razorpay for processing payments. We and Razorpay do not
          store your card data on our servers. All payment information is
          encrypted in transit and handled according to PCI-DSS standards.
          Transaction data is retained only as long as needed to complete your
          purchase.
        </p>

        <h3 className="text-xl mt-8 mb-4">SECTION 5 - THIRD-PARTY SERVICES</h3>
        <p>
          The only third-party service we use to collect or process your
          information is:
        </p>
        <ul className="list-disc list-inside">
          <li>
            <strong>Sentry</strong> (for crash and bug reporting)
          </li>
        </ul>
        <p>
          No other analytics, advertising, or data-sharing services are
          employed. Any other integrations (e.g., payment gateways) receive
          only the minimum data required to perform their function and are
          governed by their own privacy policies.
        </p>

        <h3 className="text-xl mt-8 mb-4">SECTION 6 - SECURITY</h3>
        <p>
          We take reasonable technical and organizational measures to protect
          your personal information from unauthorized access, disclosure, or
          destruction, following industry best practices.
        </p>

        <h3 className="text-xl mt-8 mb-4">SECTION 7 - COOKIES</h3>
        <p>
          We use cookies and similar technologies only to maintain your session
          and preferences on our website. We do not use cookies to track you
          across third-party websites.
        </p>

        <h3 className="text-xl mt-8 mb-4">SECTION 8 - AGE OF CONSENT</h3>
        <p>
          By using our site or app, you represent that you are at least the age
          of majority in your jurisdiction or that you have your parental consent.
        </p>

        <h3 className="text-xl mt-8 mb-4">
          SECTION 9 - CHANGES TO THIS PRIVACY POLICY
        </h3>
        <p>
          We reserve the right to update this policy at any time. Changes take
          effect as soon as they are posted. If we make material changes—such as
          adding new third party services—we will highlight those updates here
          so you can stay informed.
        </p>

        <h3 className="text-xl mt-8 mb-4">QUESTIONS & CONTACT INFORMATION</h3>
        <p>
          If you would like to access, correct, amend, or delete your personal
          information—or if you have any privacy concerns—please contact our
          Privacy Compliance Officer at{' '}
          <a href="mailto:support@designopolis.co.in">support@designopolis.co.in</a>{' '}
          or by mail at: 2nd floor, Geetanjali Complex, Sevoke Road, Siliguri
          734001.
        </p>
      </section>
      <Footer />
    </>
  );
}
