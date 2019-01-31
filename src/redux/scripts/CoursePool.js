import readttbookletserver from './readTimetable';
import timetabledata from '../../components/Timetable/timetabledata';

const CoursePool = [...readttbookletserver(timetabledata).map(course => ({ ...course, isSynced: false, clashExists: {exists: false, reasons: []} }))]

export default CoursePool