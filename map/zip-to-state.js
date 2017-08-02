function zipToState(zip) {
  if (!zip) return;
  if (typeof zip === 'number') zip = zip + '';
  while (zip.length < 5) zip = '0' + zip;

  var first3 = zip.substr(0,3);

  var codes = [
    // exceptions:
    ['005', '005', 'New York, NY'],
    ['569', '569', 'District of Columbia, DC'],
    ['885', '885', 'Texas, TX'],
    // Start with 0:
    ['039', '049', 'Maine, ME'],
    ['030', '038', 'New Hampshire, NH'],
    ['050', '059', 'Vermont, VT'],
    ['010', '029', 'Massachusetts, MA'],
    ['028', '029', 'Rhode Island, RI'],
    ['060', '069', 'Connecticut, CT'],
    ['070', '080', 'New Jersey, NJ'],
    // Start with 1:
    ['100', '149', 'New York, NY'],
    ['150', '196', 'Pennsylvania, PA'],
    ['197', '199', 'Delaware, DE'],
    // Start with 2:
    ['200', '200', 'District of Columbia, DC'],
    ['201', '201', 'Virginia, VA'],
    ['206', '219', 'Maryland, MD'],
    ['220', '246', 'Virginia, VA'],
    ['247', '269', 'West Virginia, WV'],
    ['270', '289', 'North Carolina, NC'],
    ['290', '299', 'South Carolina, SC'],
    // Start with 3:
    ['300', '319', 'Georgia, GA'],
    ['398', '399', 'Georgia, GA'],
    ['320', '349', 'Florida, FL'],
    ['350', '369', 'Alabama, AL'],
    ['386', '397', 'Mississippi, MS'],
    ['370', '385', 'Tennessee, TN'],
    // Start with 4:
    ['400', '429', 'Kentucky, KY'],
    ['430', '459', 'Ohio, OH'],
    ['460', '479', 'Indiana, IN'],
    ['480', '499', 'Michigan, MI'],
    // Start with 5:
    ['500', '529', 'Iowa, IA'],
    ['530', '549', 'Wisconsin, WI'],
    ['550', '567', 'Minnesota, MN'],
    ['570', '579', 'South Dakota, SD'],
    ['580', '589', 'North Dakota, ND'],
    ['590', '599', 'Montana, MT'],
    // Start with 6:
    ['600', '629', 'Illinois, IL'],
    ['630', '659', 'Missouri, MO'],
    ['660', '679', 'Kansas, KS'],
    ['680', '699', 'Nebraska, NE'],
    // Start with 7:
    ['700', '715', 'Louisiana, LA'],
    ['716', '729', 'Arkansas, AR'],
    ['730', '749', 'Oklahoma, OK'],
    ['750', '799', 'Texas, TX'],
    // Start with 8:
    ['800', '819', 'Colorado, CO'],
    ['820', '831', 'Wyoming, WY'],
    ['832', '839', 'Idaho, ID'],
    ['840', '849', 'Utah, UT'],
    ['850', '869', 'Arizona, AZ'],
    ['870', '884', 'New Mexico, NM'],
    ['889', '899', 'Nevada, NV'],
    // Start with 9:
    ['900', '961', 'California, CA'],
    ['967', '968', 'Hawaii, HI'],
    ['970', '979', 'Oregon, OR'],
    ['980', '994', 'Washington, WA'],
    ['995', '999', 'Alaska, AK']
  ]

  for (i in codes) {
    if (first3 >= codes[i][0] && first3 <= codes[i][1]) {
      return codes[i][2].split(',')[0];
    }
  }

  return;
}
