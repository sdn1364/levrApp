import {parseISO, formatDistanceToNow} from "date-fns";
import {Text} from '@mantine/core';

const TimeAgo = ({timestamp})=>{

  let timeAgo = '';

  if(timestamp){
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date)
    timeAgo = `${timePeriod} ago`
  }

  return <Text>{timeAgo}</Text>
}

export default TimeAgo;