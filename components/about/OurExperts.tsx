import OurExpertsClient from './OurExpertsClient'
import { experts } from './experts.data'

const OurExperts = () => {
  return <OurExpertsClient experts={experts} />
}

export default OurExperts
