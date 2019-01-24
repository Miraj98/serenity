import readttbookletserver from './readTimetable';
import timetabledata from '../../components/Timetable/timetabledata';

const CoursePool = [...readttbookletserver(timetabledata).map(course => ({ ...course, clashExists: {exists: false, reasons: []} }))]

export default CoursePool