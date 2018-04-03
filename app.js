/*jshint esversion: 6 */

// interface for posting info. Description about indicators & news.
interface Description {
  Relative_Strength : String;
  Stochastic_Fast : String;
  Commodity_Channel : String;
  Avg_Directional : String;
  Awesome_Oscil : String;
  Momentum : String;
  And_So_On : String;
}

  // assign values depending on languages
class us_news implements Description {
  constructor() {

  }
}

class kr_news implements Description {
  constructor() {

  }
}
