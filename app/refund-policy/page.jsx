import Footer from "../components/footer";
import Navbar from "../components/navbar";

export default function Refund() {
  return (
    <>
      <Navbar />
      <div class="container mx-auto my-32 px-4">
        <section class="">
          <h2 class="text-4xl mb-4">CANCELLATION AND REFUND POLICY</h2>

          {/* <!-- REFUND PROCESSING --> */}
          <h3 class="text-xl font-bold mb-2">REFUND PROCESSING</h3>
          <p class="mb-4">
            Our cancellation and return requests are processed within 4 weeks
            from the date of request. Refunded payments may take an additional
            week to be credited into the customer&apos;s account.
          </p>

          {/* <!-- REQUESTING A REFUND --> */}
          <h3 class="text-xl font-bold mb-2">REQUESTING A REFUND</h3>
          <p class="mb-4">
            If the course you purchased is not what you were expecting, you can
            request, within 30 days of your purchase of the course, that
            Designopolis apply a refund to your account. We reserve the right to
            apply your refund as a refund credit or a refund to your original
            payment method, at our discretion, depending on capabilities of our
            payment processing partners, and other factors.
          </p>
          <p class="mb-4">
            No refund is due to you if you request it after the 30-day guarantee
            time limit has passed. However, if a course you previously purchased
            is disabled for legal or policy reasons, you are entitled to a
            refund beyond this 30-day limit. To request a refund, write to us at{" "}
            <a href="mailto:support@designopolis.co.in" class="text-blue-500">
              support@designopolis.co.in
            </a>
            .
          </p>
          <p class="mb-4">
            As detailed in the contract signed, instructors agree that students
            have the right to receive these refunds. If we decide to issue
            refund credits to your account, they will be automatically applied
            towards your next course purchase on our website. Refund credits may
            expire if not used within the specified period and have no cash
            value. At our discretion, if we believe you are abusing our refund
            policy, such as if you&apos;ve consumed a significant portion of a
            course that you want to refund or if you&apos;ve previously refunded
            a course, we reserve the right to deny your refund, ban your
            account, and/or restrict all future use of the Services. If we ban
            your account or disable your access to a course due to your
            violation of these Terms, you will not be eligible to receive a
            refund.
          </p>

          {/* <!-- REFUND STATUS --> */}
          <h3 class="text-xl font-bold mb-2">REFUND STATUS</h3>
          <p class="mb-4">
            If you haven&apos;t received a refund yet, first check your bank
            account again. Then contact your credit card company; it may take
            some time before your refund is officially posted. Next, contact
            your bank. There is often some processing time before a refund is
            posted. If you&apos;ve done all of this and you still have not
            received your refund yet, please contact us at{" "}
            <a href="mailto:support@designopolis.co.in" class="text-blue-500">
              support@designopolis.co.in
            </a>
            .
          </p>

          {/* <!-- CONTACT INFORMATION --> */}
          <h3 class="text-xl font-bold mb-2">CONTACT INFORMATION</h3>
          <p>
            For any queries, write to us at:{" "}
            <a href="mailto:support@designopolis.co.in" class="text-blue-500">
              support@designopolis.co.in
            </a>
            <br></br>
            Address: 2nd floor, Geetanjali Complex, Sevoke Road, Siliguri
            734001.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}
