

// --------------------VARIABLES AND CLASSES--------------------



let coursesToRead = [""];                   //prefix of the courses to read

function isNullOrWhiteSpace(str) {
    return (!str || str.length === 0 || /^\s*$/.test(str));
}

let coursePool = [];

let daysDictionary = {
    M: 0,
    T: 1,
    W: 2,
    Th: 3,
    F: 4,
    S: 5,
};

class Course {
    constructor() {
        this.comCode = null;
        this.courseNo = null;
        this.courseTitle = null;
        this.credits = [];
        this.ic = null;
        this.lectureSections = [];
        this.tutorialSections = [];
        this.practicalSections = [];
        this.compreDate = null;
    }
}

class Section {
    constructor() {
        this.commonHour = null;
        this.type = null;
        this.sectionNo = null;
        this.instructors = [];
        this.roomNo = null;
        this.days = [];
        this.hours = [];
    }
}

class Instructor {
    constructor(instructor, department) {
        this.instructor = instructor;
        this.department = department;
    }
}


// --------------------FUNCTIONS--------------------


export default function readttbookletserver(rawText) {

    let splitText = rawText.split(/,|\n/);

    for (let i = 0; i < splitText.length;) {

        //ADD FILTRATION CLAUSE HERE

        let skipCourse = true;

        for (let j in coursesToRead) {
            let coursePrefix = coursesToRead[j];
            if (splitText[i + 1].startsWith(coursePrefix)) {
                skipCourse = false;
            }
        }

        if (skipCourse) {
            console.log("Skipping course: " + splitText[i + 1]);
            do {
                i += 12;
            } while (isNullOrWhiteSpace(splitText[i]) && i < splitText.length);
            continue;
        }

        let j = i;

        // ------------Read Course Details----------------

        // Read course code, number and title
        let newCourse = new Course();
        newCourse.comCode = parseInt(splitText[j], 10);
        newCourse.courseNo = splitText[j + 1];
        newCourse.courseTitle = splitText[j + 2];

        // Read course credits
        let individualCredits = splitText[j + 3].split(' ');
        individualCredits = individualCredits.filter(Boolean);
        for (let k = 0; k < 3; k++) {
            if (individualCredits[k] === '-') {
                newCourse.credits.push(0);
            } else {
                newCourse.credits.push(parseInt(individualCredits[k], 10));
            }
        }

        // Read compre date
        if (splitText[j + 11]) {
            let compreDateList = splitText[j + 11].split(" ");
            compreDateList = compreDateList.filter(Boolean);
            compreDateList[0] = compreDateList[0].split("/");
            newCourse.compreDate = {
                date: new Date(2019, parseInt(compreDateList[0][1]) - 1, parseInt(compreDateList[0][0])),
                time: compreDateList[1],
            }
        }

        // Read Lecture Sections
        do {
            let newSection = new Section();

            // Read common hour details, if exists
            if (splitText[j + 10]) {
                let commonHourList = splitText[j + 10].split(' ');
                commonHourList = commonHourList.filter(Boolean);
                newSection.commonHour = {
                    day: daysDictionary[commonHourList[0]],
                    hour: parseInt(commonHourList[1]),
                    room: parseInt(commonHourList[2]),
                };
            }

            // Read section number and room number
            newSection.type = "Lecture";
            newSection.sectionNo = parseInt(splitText[j + 4]) || 1;
            newSection.roomNo = parseInt(splitText[j + 7]);

            // Read section days
            let daysList = splitText[j + 8].split(' ');
            daysList = daysList.filter(Boolean);
            for (let day in daysList) {
                newSection.days.push(daysDictionary[daysList[day]]);
            }

            // Read section hours
            let hoursList = splitText[j + 9].split(' ');
            hoursList = hoursList.filter(Boolean);
            for (let hour in hoursList) {
                newSection.hours.push(parseInt(hoursList[hour]));
            }

            // Read section instructors
            do {
                let newInstructor = new Instructor(splitText[j + 5], splitText[j + 6]);
                newSection.instructors.push(newInstructor);
                j += 12;
            } while (isNullOrWhiteSpace(splitText[j]) && isNullOrWhiteSpace(splitText[j + 2]) && isNullOrWhiteSpace(splitText[j + 4]) && (j < splitText.length));

            newCourse.lectureSections.push(newSection);

        } while (isNullOrWhiteSpace(splitText[j]) && isNullOrWhiteSpace(splitText[j + 2]) && (j < splitText.length));

        // Read Practical Sections
        if (isNullOrWhiteSpace(splitText[j]) && (splitText[j + 2] === 'Practical')) {
            do {
                let newSection = new Section();

                // Read section number and room number
                newSection.type = "Practical";
                newSection.sectionNo = parseInt(splitText[j + 4]) || 1;
                newSection.roomNo = parseInt(splitText[j + 7]);

                // Read section days
                let daysList = splitText[j + 8].split(' ');
                daysList = daysList.filter(Boolean);
                for (let day in daysList) {
                    newSection.days.push(daysDictionary[daysList[day]]);
                }

                // Read section hours
                let hoursList = splitText[j + 9].split(' ');
                hoursList = hoursList.filter(Boolean);
                for (let hour in hoursList) {
                    newSection.hours.push(parseInt(hoursList[hour]));
                }

                // Read section instructors
                do {
                    let newInstructor = new Instructor(splitText[j + 5], splitText[j + 6]);
                    newSection.instructors.push(newInstructor);
                    j += 12;
                } while (isNullOrWhiteSpace(splitText[j]) && isNullOrWhiteSpace(splitText[j + 2]) && isNullOrWhiteSpace(splitText[j + 4]) && (j < splitText.length));

                newCourse.practicalSections.push(newSection);

            } while (isNullOrWhiteSpace(splitText[j]) && isNullOrWhiteSpace(splitText[j + 2]) && (j < splitText.length));
        }

        // Read Tutorial Sections
        if (isNullOrWhiteSpace(splitText[j]) && (splitText[j + 2] === 'Tutorial')) {
            do {
                let newSection = new Section();

                // Read section number and room number
                newSection.type = "Tutorial";
                newSection.sectionNo = parseInt(splitText[j + 4]) || 1;
                newSection.roomNo = parseInt(splitText[j + 7]);

                // Read section days
                let daysList = splitText[j + 8].split(' ');
                daysList = daysList.filter(Boolean);
                for (let day in daysList) {
                    newSection.days.push(daysDictionary[daysList[day]]);
                }

                // Read section hours
                let hoursList = splitText[j + 9].split(' ');
                hoursList = hoursList.filter(Boolean);
                for (let hour in hoursList) {
                    newSection.hours.push(parseInt(hoursList[hour]));
                }

                // Read section instructors
                do {
                    let newInstructor = new Instructor(splitText[j + 5], splitText[j + 6]);
                    newSection.instructors.push(newInstructor);
                    j += 12;
                } while (isNullOrWhiteSpace(splitText[j]) && isNullOrWhiteSpace(splitText[j + 2]) && isNullOrWhiteSpace(splitText[j + 4]) && (j < splitText.length));

                newCourse.tutorialSections.push(newSection);

            } while (isNullOrWhiteSpace(splitText[j]) && isNullOrWhiteSpace(splitText[j + 2]) && (j < splitText.length));
        }

        i = j;

        coursePool.push(newCourse);
    }

    return coursePool
}

