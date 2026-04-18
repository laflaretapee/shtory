import { FaqSection } from '../components/FaqSection'
import { LeadFormSection } from '../components/LeadFormSection'
import { ContactsSection } from '../components/ContactsSection'
import { SeoLocalSection } from '../components/SeoLocalSection'
import { siteContent } from '../data/siteContent'

export function ContactsPage() {
  return (
    <>
      <ContactsSection data={siteContent.contactsBlock} contacts={siteContent.contacts} />
      <LeadFormSection />
      <FaqSection items={siteContent.faq} />
      <SeoLocalSection data={siteContent.localSeo} />
    </>
  )
}
