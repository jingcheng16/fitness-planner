const getCurrentDate = () => {
  let stringDate: string;
  let stringMonth: string;
  let date = new Date().getDate();
  if (date < 10) {
    stringDate = "0" + date;
  } else {
    stringDate = date + "";
  }
  let month = new Date().getMonth() + 1;
  if (month < 10) {
    stringMonth = "0" + month;
  } else {
    stringMonth = month + "";
  }
  let year = new Date().getFullYear();

  //Alert.alert(date + '-' + month + '-' + year);
  // You can turn it in to your desired format
  return year + "-" + stringMonth + "-" + stringDate;
};

export default getCurrentDate;
