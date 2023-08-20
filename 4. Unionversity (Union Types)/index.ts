import courses from './courses';
import studyGroups from './studyGroups';

type Course = {
    id: number;
    studyGroupId: number;
    title: string;
    keywords: string[];
    eventType: string;
};

type StudyGroup = {
    id: number;
    courseId: number;
    title: string;
    keywords: string[];
    eventType: string;
};

type SearchEventsOptions = {
    query: string | number;
    eventType: 'courses' | 'groups';
};

const searchEvents = (options: SearchEventsOptions) => {
    const events: (Course | StudyGroup)[] =
        options.eventType === 'courses' ? courses : studyGroups;

    return events.filter((event: Course | StudyGroup) => {
        if (typeof options.query === 'number') {
            return event.id === options.query;
        }

        if (typeof options.query === 'string') {
            return event.keywords.indexOf(options.query) !== -1;
        }
    });
};

const searchResults = searchEvents({ query: 'art', eventType: 'courses' });
console.log('searchResults: ', searchResults);

let enrolledEvents: (Course | StudyGroup)[] = [];

const enroll = (event: Course | StudyGroup) => {
    enrolledEvents = [...enrolledEvents, event];
};

enroll(searchResults[0]);
console.log('enrolledEvents: ', enrolledEvents);
