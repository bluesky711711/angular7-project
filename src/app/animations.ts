import {
    trigger,
    animate,
    transition,
    style,
    query,
    state,
    sequence,
    stagger
} from '@angular/animations';

// export const routeAnimation =
// trigger('routeAnimation', [
//     transition('* => *', [
//         query(
//             ':enter',
//             style({ opacity: 0, position: 'fixed', width: '100%' }),
//             { optional: true }
//         ),
//         query(
//             ':leave',
//             [style({ opacity: 1 }), animate('0.3s', style({ opacity: 0, position: 'fixed', width: '100%' }))],
//             { optional: true }
//         ),
//         query(
//             ':enter',
//             [style({ opacity: 0 }), animate('0.3s', style({ opacity: 1, position: 'fixed', width: '100%' }))],
//             { optional: true }
//         )
//     ])
// ]);
export const ROUTE_ANIMATIONS_ELEMENTS = 'route-animations-elements';
export const routeAnimation =
trigger('routeAnimation', [
    transition('* => *', [
        query(':enter > *', style({ opacity: 0, position: 'fixed' }), {
            optional: true
        }),
        query(':enter .' + ROUTE_ANIMATIONS_ELEMENTS, style({ opacity: 0 }), {
            optional: true
        }),
        sequence([
            query(
                ':leave > *',
                [
                    style({ transform: 'translateY(0%)', opacity: 1 }),
                    animate(
                        '0.2s ease-in-out',
                        style({ transform: 'translateY(-3%)', opacity: 0 })
                    ),
                    style({ position: 'fixed' })
                ],
                { optional: true }
            ),
            query(
                ':enter > *',
                [
                    style({
                        transform: 'translateY(-3%)',
                        opacity: 0,
                        position: 'static'
                    }),
                    animate(
                        '0.5s ease-in-out',
                        style({ transform: 'translateY(0%)', opacity: 1 })
                    )
                ],
                { optional: true }
            )
        ]),
        query(
            ':enter .' + ROUTE_ANIMATIONS_ELEMENTS,
            stagger(100, [
                style({ transform: 'translateY(15%)', opacity: 0 }),
                animate(
                    '0.5s ease-in-out',
                    style({ transform: 'translateY(0%)', opacity: 1 })
                )
            ]),
            { optional: true }
        )
    ])
]);

export const slideOutLeft = [
    style({ transform: 'translate3d(0, 0, 0)', offset: 0 }),
    style({ transform: 'translate3d(-20%, 0, 0)', offset: 1 }),
];
