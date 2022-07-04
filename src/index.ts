type Dates = {
  startDate: string;
  endDate: string;
};

const extractDates = (customer: any) => {
  // your code here

  // if props exist
  if ("ListOfPeriods" in customer) {
    //if is null
    if (!customer["ListOfPeriods"]) {
      return [];
    } else {
      // exist and is not null
      // detect null strings
      let nullDetect = /[NULnul]{4}/;
      if (nullDetect.test(customer["ListOfPeriods"])) {
        return [];
      } else {
        // check multiple periods
        if (customer["ListOfPeriods"].indexOf("|") <= 0) {
          // it's only 1 period
          let dates = customer["ListOfPeriods"].replace(/\s/g, "").split("-");
          return [{ startDate: dates[0], endDate: dates[1] }];
        } else {
          // there are multiple periods
          let res = customer["ListOfPeriods"].replace(/\s/g, "").split("|");
          let result = [];

          for (let i = 0; i < res.length; i++) {
            let dates = res[i].split("-");
            // change date format to dd/mm/yyyy from mm/dd/yyyy
            const fixS = dates[0].split(".")
            const fixE = dates[1].split(".")
            let s = new Date(`${fixS[1]}.${fixS[0]}.${fixS[2]}`);
            let e = new Date(`${fixE[1]}.${fixE[0]}.${fixE[2]}`);
            if (
              s.toString() != "Invalid Date" &&
              e.toString() != "Invalid Date"
            ) {
              if(s.getTime()>e.getTime()){return ["string length is invalid"]}
              result.push({
                startDate: dates[0],
                endDate: dates[1],
              });
            }
            else{
              // date string is not valid
              return ["string length is invalid"]
            }
          }
          return result;
        }
      }
    }
  } else {
    // props not exist
    return [];
  }
};

export default extractDates;
