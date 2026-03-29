import TeamsGridClient from './TeamsGridClient'
import { experts } from '../about/experts.data'

const TeamsGrid = () => {
  return <TeamsGridClient experts={experts} />
}

export default TeamsGrid
