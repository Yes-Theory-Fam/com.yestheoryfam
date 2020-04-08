interface IMeetupProps {
  title: string;
  description: string;
  dateStart: number;
  dateEnd: number;
  limit: number;
  details: Array<string>;
  imageSource: string;
}

export default IMeetupProps;
