'use strict';

const routeShipments = require('../route-shipments');

describe('route-shipments/', () => {
  it('returns the expected result when drivers and destinations are of equal length', () => {
    const drivers = [
      'Lonnie Block',
      'Claudia Schinner',
      'Mindy Marquardt',
      'Renee Goldner',
      'Verna Kris III'
    ];
    const destinations = [
      '6158 Murazik Curve Suite 690, Lawton, HI 98077',
      '6339 Rowe Cliff, Kennewick, MI 46258-4797',
      '11142 Nienow Passage Apt. 717, Salt Lake City, AR 04656-9413',
      '83041 Jimmy Rest, Buckeye, ME 17026',
      '6574 Louie Neck Suite 747, Danville, UT 39781'
    ];

    expect(routeShipments(drivers, destinations)).toEqual({
      suitabilityScore: 56,
      matches: [
        ['Lonnie Block', '6574 Louie Neck Suite 747, Danville, UT 39781'],
        [
          'Claudia Schinner',
          '11142 Nienow Passage Apt. 717, Salt Lake City, AR 04656-9413'
        ],
        ['Mindy Marquardt', '83041 Jimmy Rest, Buckeye, ME 17026'],
        [
          'Renee Goldner',
          '6158 Murazik Curve Suite 690, Lawton, HI 98077'
        ],
        ['Verna Kris III', '6339 Rowe Cliff, Kennewick, MI 46258-4797']
      ]
    });
  });

  it('returns the expected result when there are more drivers', () => {
    const drivers = [
      'Saul Leffler',
      'Bernice Koch',
      'Scott Konopelski',
      'Bonnie Treutel',
      'Claire Kihn MD'
    ];
    const destinations = [
      '56112 Lynch Plaza Suite 952, Indio, WV 78859-5743',
      '146 Dickinson Viaduct, Fargo, DE 56907',
      '962 Brent Motorway Apt. 153, St. Paul, ID 04763',
      '43367 Eldridge Fields, McAllen, MS 26329-8437'
    ];

    expect(routeShipments(drivers, destinations)).toEqual({
      suitabilityScore: 42,
      matches: [
        ['Saul Leffler', '146 Dickinson Viaduct, Fargo, DE 56907'],
        [
          'Scott Konopelski',
          '962 Brent Motorway Apt. 153, St. Paul, ID 04763'
        ],
        [
          'Bonnie Treutel',
          '43367 Eldridge Fields, McAllen, MS 26329-8437'
        ],
        [
          'Claire Kihn MD',
          '56112 Lynch Plaza Suite 952, Indio, WV 78859-5743'
        ]
      ]
    });
  });

  it('returns the expected result when there are more destinations', () => {
    const drivers = [
      'Kelly Sipes',
      'Melissa Witting',
      'Mrs. Violet Kertzmann DVM',
      'Raul Russel'
    ];
    const destinations = [
      '9408 Lourdes Cliff Suite 533, Biloxi, WY 27381',
      '77652 Estel Lock, Fort Worth, GA 06232',
      '869 Edison Freeway Suite 782, Santa Monica, VA 37590',
      '9754 Lonzo Shoal, Camden, SD 41222-0529',
      '835 Jessie Prairie Suite 037, Mentor, OR 33437-2854'
    ];

    expect(routeShipments(drivers, destinations)).toEqual({
      suitabilityScore: 50.5,
      matches: [
        ['Kelly Sipes', '9408 Lourdes Cliff Suite 533, Biloxi, WY 27381'],
        ['Melissa Witting', '77652 Estel Lock, Fort Worth, GA 06232'],
        [
          'Mrs. Violet Kertzmann DVM',
          '9754 Lonzo Shoal, Camden, SD 41222-0529'
        ],
        [
          'Raul Russel',
          '869 Edison Freeway Suite 782, Santa Monica, VA 37590'
        ]
      ]
    });
  });
});
