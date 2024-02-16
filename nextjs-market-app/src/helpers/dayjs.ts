import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

<<<<<<< HEAD
=======

>>>>>>> 4eeb43f2dac7bd3bab12984b82b8927911708539
dayjs.extend(relativeTime);
dayjs.locale('ko');

export function fromNow(time: string | Date) {
    return dayjs(time).fromNow()
<<<<<<< HEAD
}

export function formatTime(time: string | Date, format= 'YYYY.MM.DD h:mm A') {
    return dayjs(time).format(format);
=======
>>>>>>> 4eeb43f2dac7bd3bab12984b82b8927911708539
}