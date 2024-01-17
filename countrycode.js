const countryCodes = {
  AF: "afghanistan",
  AX: "aland islands",
  AL: "albania",
  DZ: "algeria",
  AS: "american samoa",
  AD: "andorra",
  AO: "angola",
  AI: "anguilla",
  AQ: "antarctica",
  AG: "antigua and barbuda",
  AR: "argentina",
  AM: "armenia",
  AW: "aruba",
  AU: "australia",
  AT: "austria",
  AZ: "azerbaijan",
  ST: "sao tome and principe",
  BS: "bahamas",
  BH: "bahrain",
  BD: "bangladesh",
  BB: "barbados",
  BY: "belarus",
  BE: "belgium",
  BZ: "belize",
  BJ: "benin",
  BT: "bhutan",
  BO: "bolivia",
  BA: "bosnia and herzegovina",
  BW: "botswana",
  BV: "bouvet island",
  BR: "brazil",
  VG: "british virgin islands",
  IO: "british indian ocean territory",
  BN: "brunei darussalam",
  BG: "bulgaria",
  BF: "burkina faso",
  BI: "burundi",
  KH: "cambodia",
  CM: "cameroon",
  CA: "canada",
  CV: "cape verde",
  KY: "cayman islands",
  CF: "central african republic",
  TD: "chad",
  CL: "chile",
  CN: "china",
  HK: "hong kong",
  CR: "costa rica",
  MO: "macao",
  CX: "christmas island",
  CC: "cocos (keeling) islands",
  CO: "colombia",
  KM: "comoros",
  CD: "congo",
  CK: "cook islands",
  CI: "côte d ivoire",
  HR: "croatia",
  CU: "cuba",
  CY: "cyprus",
  CZ: "czech republic",
  DK: "denmark",
  DJ: "djibouti",
  DM: "dominica",
  DO: "dominican republic",
  EC: "ecuador",
  EG: "egypt",
  SV: "el salvador",
  GQ: "equatorial guinea",
  ER: "eritrea",
  EE: "estonia",
  ET: "ethiopia",
  FK: "falkland islands",
  FO: "faroe islands",
  FJ: "fiji",
  FI: "finland",
  FR: "france",
  GF: "french guiana",
  PF: "french polynesia",
  TF: "french southern territories",
  GA: "gabon",
  GM: "gambia",
  GE: "georgia",
  DE: "germany",
  GH: "ghana",
  GI: "gibraltar",
  GR: "greece",
  GL: "greenland",
  GD: "grenada",
  GP: "guadeloupe",
  GU: "guam",
  GT: "guatemala",
  GG: "guernsey",
  GN: "guinea",
  GW: "guinea-bissau",
  GY: "guyana",
  HT: "haiti",
  HM: "heard and mcdonald islands",
  VA: "holy see (vatican city state)",
  HN: "honduras",
  HU: "hungary",
  IS: "iceland",
  FM: "micronesia",
  RE: "réunion",
  ID: "indonesia",
  IR: "iran",
  IQ: "iraq",
  IE: "ireland",
  IM: "isle of man",
  IL: "israel",
  IT: "italy",
  JM: "jamaica",
  JP: "japan",
  JE: "jersey",
  JO: "jordan",
  MD: "moldova",
  KZ: "kazakhstan",
  KE: "kenya",
  KI: "kiribati",
  KP: "korea (north)",
  KR: "korea (south)",
  KW: "kuwait",
  KG: "kyrgyzstan",
  LA: "lao pdr",
  LV: "latvia",
  LB: "lebanon",
  LS: "lesotho",
  LR: "liberia",
  LY: "libya",
  LI: "liechtenstein",
  LT: "lithuania",
  LU: "luxembourg",
  MK: "macedonia",
  MG: "madagascar",
  MW: "malawi",
  MY: "malaysia",
  MV: "maldives",
  BM: "bermuda",
  ML: "mali",
  MT: "malta",
  MH: "marshall islands",
  MQ: "martinique",
  MR: "mauritania",
  MU: "mauritius",
  YT: "mayotte",
  MX: "mexico",
  MC: "monaco",
  MN: "mongolia",
  ME: "montenegro",
  MS: "montserrat",
  MA: "morocco",
  MZ: "mozambique",
  MM: "myanmar",
  NA: "namibia",
  NR: "nauru",
  NP: "nepal",
  NL: "netherlands",
  AN: "netherlands antilles",
  NC: "new caledonia",
  NZ: "new zealand",
  NI: "nicaragua",
  NE: "niger",
  NG: "nigeria",
  NU: "niue",
  NF: "norfolk island",
  MP: "northern mariana islands",
  NO: "norway",
  OM: "oman",
  PK: "pakistan",
  PW: "palau",
  PS: "palestinian territory",
  PA: "panama",
  PG: "papua new guinea",
  PY: "paraguay",
  PE: "peru",
  PH: "philippines",
  PN: "pitcairn",
  PT: "portugal",
  PR: "puerto rico",
  QA: "qatar",
  RO: "romania",
  RU: "russian federation",
  RW: "rwanda",
  BL: "saint-barthélemy",
  SH: "saint helena",
  KN: "saint kitts and nevis",
  LC: "saint lucia",
  WS: "samoa",
  SM: "san marino",
  SA: "saudi arabia",
  SN: "senegal",
  RS: "serbia",
  SC: "seychelles",
  SL: "sierra leone",
  SG: "singapore",
  SK: "slovakia",
  SI: "slovenia",
  SB: "solomon",
  SO: "somalia",
  ZA: "south africa",
  GS: "south georgia and the south sandwich islands",
  SS: "south sudan",
  ES: "spain",
  LK: "sri lanka",
  SD: "sudan",
  SR: "suriname",
  SJ: "svalbard and jan mayen islands",
  SZ: "swaziland",
  SE: "sweden",
  CH: "switzerland",
  SY: "syrian arab republic",
  TW: "taiwan",
  TJ: "tajikistan",
  TZ: "tanzania",
  TH: "thailand",
  TL: "timor-leste",
  TG: "togo",
  TK: "tokelau",
  TO: "tonga",
  TT: "trinidad and tobago",
  TN: "tunisia",
  TR: "turkey",
  TM: "turkmenistan",
  TC: "turks",
  TV: "tuvalu",
  UG: "uganda",
  UA: "ukraine",
  AE: "united arab emirates",
  GB: "united kingdom",
  US: "united states",
  UM: "united states minor outlying islands",
  UY: "uruguay",
  UZ: "uzbekistan",
  VU: "vanuatu",
  VE: "venezuela",
  VN: "vietnam",
  VI: "virgin islands",
  WF: "wallis and futuna islands",
  EH: "western sahara",
  YE: "yemen",
  ZM: "zambia",
  ZW: "zimbabwe",
};
export default countryCodes;