import React from "react"
import { Container } from "reactstrap"
import { useStaticQuery, graphql } from "gatsby"
import PageHeader from "../components/pageHeader"

const PrivacyPolicyPage = () => {
  const data = useStaticQuery(graphql`
    query PrivacyPolicydataQuery {
      site {
        siteMetadata {
          title
          fullTitle
          email
          contact {
            mobile
          }
          address
        }
      }
    }
  `)

  const { title, fullTitle, email, contact, address } = data.site.siteMetadata

  return (
    <section id="privacy-policy">
      <PageHeader title="Privacy Policy" />
      <Container>
        <main className="privacy-policy-page section-lg">
          <h2 className="header-title text-center font-weight-bold mb-4">
            Privacy Policy
          </h2>

          <p className="text-muted text-center mb-5">
            <strong>Effective Date:</strong> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <section className="mb-5">
            <h3 className="font-weight-bold mb-3">1. Introduction</h3>
            <p>
              {fullTitle} ("we," "us," or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or interact with us through Facebook lead generation ads, contact forms, or other communication channels.
            </p>
            <p>
              By using our website or submitting information to us, you consent to the practices described in this Privacy Policy.
            </p>
          </section>

          <section className="mb-5">
            <h3 className="font-weight-bold mb-3">2. Information We Collect</h3>

            <h4 className="font-weight-bold mt-4 mb-3">2.1 Information You Provide Directly</h4>
            <p>We collect information that you voluntarily provide to us when you:</p>
            <ul>
              <li>Submit a contact form on our website</li>
              <li>Fill out a Facebook lead generation form</li>
              <li>Call or email us directly</li>
              <li>Request a quote or consultation</li>
              <li>Apply for employment opportunities</li>
            </ul>
            <p>This information may include:</p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Mailing address</li>
              <li>Project details and specifications</li>
              <li>Any other information you choose to provide</li>
            </ul>

            <h4 className="font-weight-bold mt-4 mb-3">2.2 Information Collected Automatically</h4>
            <p>When you visit our website, we may automatically collect certain information, including:</p>
            <ul>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website</li>
              <li>Date and time of visit</li>
            </ul>

            <h4 className="font-weight-bold mt-4 mb-3">2.3 Information from Third Parties</h4>
            <p>
              We may receive information about you from third-party platforms such as Facebook when you interact with our advertisements or lead generation forms. This information may include your name, email address, phone number, and other details you provide through those platforms.
            </p>
          </section>

          <section className="mb-5">
            <h3 className="font-weight-bold mb-3">3. How We Use Your Information</h3>
            <p>We use the information we collect for the following purposes:</p>
            <ul>
              <li>To respond to your inquiries and provide customer support</li>
              <li>To provide quotes and estimates for construction services</li>
              <li>To communicate with you about your projects</li>
              <li>To schedule consultations and appointments</li>
              <li>To process employment applications</li>
              <li>To improve our website and services</li>
              <li>To send marketing communications (with your consent)</li>
              <li>To comply with legal obligations</li>
              <li>To analyze website usage and trends</li>
            </ul>
          </section>

          <section className="mb-5">
            <h3 className="font-weight-bold mb-3">4. Facebook Lead Generation</h3>
            <p>
              We use Facebook lead generation ads to collect information from potential customers. When you submit a lead form through Facebook:
            </p>
            <ul>
              <li>Your information is collected by Facebook and shared with us</li>
              <li>We use this information solely for the purpose of responding to your inquiry</li>
              <li>Your information is subject to both our Privacy Policy and Facebook's Data Policy</li>
              <li>You may opt out of future communications from us at any time</li>
            </ul>
            <p>
              For more information about how Facebook handles your data, please review <a href="https://www.facebook.com/privacy/explanation" target="_blank" rel="noopener noreferrer">Facebook's Data Policy</a>.
            </p>
          </section>

          <section className="mb-5">
            <h3 className="font-weight-bold mb-3">5. How We Share Your Information</h3>
            <p>
              We do not sell, rent, or trade your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul>
              <li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you (e.g., email service providers, payment processors)</li>
              <li><strong>Legal Requirements:</strong> When required by law, subpoena, or other legal process</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              <li><strong>With Your Consent:</strong> When you have given us explicit permission to share your information</li>
            </ul>
          </section>

          <section className="mb-5">
            <h3 className="font-weight-bold mb-3">6. Cookies and Tracking Technologies</h3>
            <p>
              Our website may use cookies and similar tracking technologies to enhance your browsing experience. Cookies are small data files stored on your device that help us:
            </p>
            <ul>
              <li>Remember your preferences</li>
              <li>Understand how you use our website</li>
              <li>Improve website functionality</li>
              <li>Deliver targeted advertising through platforms like Facebook</li>
            </ul>
            <p>
              You can control cookie settings through your browser. However, disabling cookies may limit your ability to use certain features of our website.
            </p>
          </section>

          <section className="mb-5">
            <h3 className="font-weight-bold mb-3">7. Data Security</h3>
            <p>
              We implement reasonable security measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-5">
            <h3 className="font-weight-bold mb-3">8. Data Retention</h3>
            <p>
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When your information is no longer needed, we will securely delete or anonymize it.
            </p>
          </section>

          <section className="mb-5">
            <h3 className="font-weight-bold mb-3">9. Your Privacy Rights</h3>
            <p>Depending on your location, you may have the following rights regarding your personal information:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Opt-Out:</strong> Opt out of marketing communications at any time</li>
              <li><strong>Restrict Processing:</strong> Request that we limit how we use your information</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the information provided below.
            </p>
          </section>

          <section className="mb-5">
            <h3 className="font-weight-bold mb-3">10. Third-Party Links</h3>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section className="mb-5">
            <h3 className="font-weight-bold mb-3">11. Children's Privacy</h3>
            <p>
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately so we can delete it.
            </p>
          </section>

          <section className="mb-5">
            <h3 className="font-weight-bold mb-3">12. Changes to This Privacy Policy</h3>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will post the updated policy on this page with a new "Effective Date." We encourage you to review this Privacy Policy periodically.
            </p>
          </section>

          <section className="mb-5">
            <h3 className="font-weight-bold mb-3">13. Contact Us</h3>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="contact-details ml-4 mt-3">
              <p><strong>{title}</strong></p>
              <p>{address}</p>
              <p>Phone: <a href={`tel:${contact.mobile}`}>{contact.mobile}</a></p>
              <p>Email: <a href={`mailto:${email}`}>{email}</a></p>
            </div>
          </section>

          <hr className="my-5" />

          <p className="text-muted text-center">
            By using our website or providing your information to us, you acknowledge that you have read and understood this Privacy Policy.
          </p>
        </main>
      </Container>
    </section>
  )
}

export default PrivacyPolicyPage
