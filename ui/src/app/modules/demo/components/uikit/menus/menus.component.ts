import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';

@Component({
    templateUrl: './menus.component.html',
    styles: [`
        :host ::ng-deep .p-menubar-root-list {
            flex-wrap: wrap;
        }
    `]
})
export class MenusComponent implements OnInit {

    breadcrumbItems: MenuItem[] = [];
    tieredItems: MenuItem[] = [];
    items: MenuItem[] = [];
    routeItems: MenuItem[] = [];
    megaMenuItems: MegaMenuItem[] = [];
    panelMenuItems: MenuItem[] = [];
    stepsItems: MenuItem[] = [];
    slideItems: MenuItem[] = [];
    menuItems: MenuItem[] = [];
    plainMenuItems: MenuItem[] = [];
    pageIndex: number = 0;

    ngOnInit() {
        this.tieredItems = [
            {
                label: 'Клиенты',
                icon: 'pi pi-fw pi-table',
                items: [
                    {
                        label: 'Новый',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            {
                                label: 'Клиент',
                                icon: 'pi pi-fw pi-plus'
                            },
                            {
                                label: 'Копировать',
                                icon: 'pi pi-fw pi-copy'
                            },

                        ]
                    },
                    {
                        label: 'Редактировать',
                        icon: 'pi pi-fw pi-user-edit'
                    }
                ]
            },
            {
                label: 'Заказы',
                icon: 'pi pi-fw pi-shopping-cart',
                items: [
                    {
                        label: 'Вид',
                        icon: 'pi pi-fw pi-list'
                    },
                    {
                        label: 'Поиск',
                        icon: 'pi pi-fw pi-search'
                    }

                ]
            },
            {
                label: 'Доставка',
                icon: 'pi pi-fw pi-envelope',
                items: [
                    {
                        label: 'Отслеживать',
                        icon: 'pi pi-fw pi-compass',

                    },
                    {
                        label: 'Карта',
                        icon: 'pi pi-fw pi-map-marker',

                    },
                    {
                        label: 'Управление',
                        icon: 'pi pi-fw pi-pencil'
                    }
                ]
            },
            {
                label: 'Профиль',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Настройки',
                        icon: 'pi pi-fw pi-cog'
                    },
                    {
                        label: 'Оплата',
                        icon: 'pi pi-fw pi-file'
                    }
                ]
            },
            { separator: true },
            {
                label: 'Выход',
                icon: 'pi pi-fw pi-sign-out'
            }
        ];

        this.items = [
            {
                label: 'Клиенты',
                items: [
                    {
                        label: 'Новый',
                        icon: 'pi pi-fw pi-plus'
                    },
                    {
                        label: 'Редактировать',
                        icon: 'pi pi-fw pi-user-edit'
                    }
                ]
            },
            {
                label: 'Заказы',
                items: [
                    {
                        label: 'Вид',
                        icon: 'pi pi-fw pi-list'
                    },
                    {
                        label: 'Поиск',
                        icon: 'pi pi-fw pi-search'
                    }

                ]
            },
            {
                label: 'Доставка',
                items: [
                    {
                        label: 'Отслеживать',
                        icon: 'pi pi-fw pi-compass',

                    },
                    {
                        label: 'Карта',
                        icon: 'pi pi-fw pi-map-marker',

                    },
                    {
                        label: 'Управление',
                        icon: 'pi pi-fw pi-pencil'
                    }
                ]
            }
        ];

        this.menuItems = [
            {
                label: 'Сохранить', icon: 'pi pi-fw pi-check'
            },
            {
                label: 'Обновить', icon: 'pi pi-fw pi-refresh'
            },
            {
                label: 'Удалить', icon: 'pi pi-fw pi-trash'
            },
            {
                separator: true
            },
            {
                label: 'Главная', icon: 'pi pi-fw pi-home'
            },
        ];

        this.slideItems = [
            {
                label: 'Клиенты',
                icon: 'pi pi-fw pi-table',
                items: [
                    {
                        label: 'Новый',
                        icon: 'pi pi-fw pi-plus'
                    },
                    {
                        label: 'Редактировать',
                        icon: 'pi pi-fw pi-user-edit'
                    }
                ]
            },
            {
                label: 'Заказы',
                icon: 'pi pi-fw pi-shopping-cart',
                items: [
                    {
                        label: 'Вид',
                        icon: 'pi pi-fw pi-list'
                    },
                    {
                        label: 'Поиск',
                        icon: 'pi pi-fw pi-search'
                    }

                ]
            },
            {
                label: 'Доставка',
                icon: 'pi pi-fw pi-envelope',
                items: [
                    {
                        label: 'Отслеживать',
                        icon: 'pi pi-fw pi-compass',

                    },
                    {
                        label: 'Карта',
                        icon: 'pi pi-fw pi-map-marker',

                    },
                    {
                        label: 'Управление',
                        icon: 'pi pi-fw pi-pencil'
                    }
                ]
            },
            {
                label: 'Профиль',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Настройки',
                        icon: 'pi pi-fw pi-cog'
                    },
                    {
                        label: 'Оплата',
                        icon: 'pi pi-fw pi-file'
                    }
                ]
            }
        ];

        this.plainMenuItems = [
            {
                label: 'Клиенты',
                items: [
                    {
                        label: 'Новый',
                        icon: 'pi pi-fw pi-plus'
                    },
                    {
                        label: 'Редактировать',
                        icon: 'pi pi-fw pi-user-edit'
                    }
                ]
            },
            {
                label: 'Заказы',
                items: [
                    {
                        label: 'Вид',
                        icon: 'pi pi-fw pi-list'
                    },
                    {
                        label: 'Поиск',
                        icon: 'pi pi-fw pi-search'
                    }

                ]
            }
        ];

        this.breadcrumbItems = [];
        this.breadcrumbItems.push({ label: 'Электроника' });
        this.breadcrumbItems.push({ label: 'Компьютеры' });
        this.breadcrumbItems.push({ label: 'Ноутбуки' });
        this.breadcrumbItems.push({ label: 'Аксессуары' });
        this.breadcrumbItems.push({ label: 'Сумки' });

        this.routeItems = [
            { label: 'Выбор даты вылета', routerLink: 'personal' },
            { label: 'Выбор места', routerLink: 'seat' },
            { label: 'Оплата', routerLink: 'payment' },
            { label: 'Подтверждение', routerLink: 'confirmation' },
        ];

        this.megaMenuItems = [
            {
                label: 'Одежда', icon: 'pi pi-fw pi-tag',
                items: [
                    [
                        {
                            label: 'Женская',
                            items: [{ label: 'Трусишки' }, { label: 'Обувь' }, { label: 'Юбки' }]
                        },
                        {
                            label: 'Мужская',
                            items: [{ label: 'Брюки' }, { label: 'Рубашки' }, { label: 'Обувь' }]
                        }
                    ],
                    [
                        {
                            label: 'Детская',
                            items: [{ label: 'Верхняя' }, { label: 'Обувь' }]
                        },
                        {
                            label: 'Сумки',
                            items: [{ label: 'Дорожные' }, { label: 'Женские' }, { label: 'Мужские' }]
                        }
                    ]
                ]
            },
            {
                label: 'Электроника', icon: 'pi pi-fw pi-desktop',
                items: [
                    [
                        {
                            label: 'Компьютеры',
                            items: [{ label: 'Ноутбуки' }, { label: 'Моноблоки' }]
                        },
                        {
                            label: 'Мобильные',
                            items: [{ label: 'Смартфоны' }, { label: 'Планшеты' }, { label: 'Электронные книги' }]
                        }
                    ],
                    [
                        {
                            label: 'ТВ',
                            items: [{ label: 'Телевизоры' }, { label: 'Медиаплееры' }]
                        },
                        {
                            label: 'Аудио',
                            items: [{ label: 'Аккустика' }, { label: 'Усилители' }, { label: 'ЦАП' }]
                        }
                    ],
                    [
                        {
                            label: 'Спорт',
                            items: [{ label: 'Могила' }, { label: 'Сила' }]
                        }
                    ]
                ]
            },
            {
                label: 'Интерьер', icon: 'pi pi-fw pi-image',
                items: [
                    [
                        {
                            label: 'Гостиная',
                            items: [{ label: 'Диван' }, { label: 'Комод' }]
                        },
                        {
                            label: 'Кухня',
                            items: [{ label: 'Шкаф' }, { label: 'Стол' }, { label: 'Стул' }]
                        }
                    ],
                    [
                        {
                            label: 'Спальня',
                            items: [{ label: 'Набор БДСМ' }, { label: 'Кровать' }]
                        },
                        {
                            label: 'Детская',
                            items: [{ label: 'Уголок' }, { label: 'Кровать' }]
                        }
                    ]
                ]
            },
            {
                label: 'Спорт', icon: 'pi pi-fw pi-star',
                items: [
                    [
                        {
                            label: 'Баскетбол',
                            items: [{ label: 'Мяч' }, { label: 'Корзина' }]
                        },
                        {
                            label: 'Футбол',
                            items: [{ label: 'Ворота' }, { label: 'Кроссовки' }, { label: 'Мяч' }]
                        }
                    ],
                    [
                        {
                            label: 'Теннис',
                            items: [{ label: 'Ракетка' }, { label: 'Сетка' }]
                        }
                    ]
                ]
            },
        ];

        this.panelMenuItems = [
            {
                label: 'Клиенты',
                items: [
                    {
                        label: 'Новый',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            {
                                label: 'Клиент',
                                icon: 'pi pi-fw pi-plus'
                            },
                            {
                                label: 'Копировать',
                                icon: 'pi pi-fw pi-copy'
                            },

                        ]
                    },
                    {
                        label: 'Редактировать',
                        icon: 'pi pi-fw pi-user-edit'
                    }
                ]
            },
            {
                label: 'Заказы',
                items: [
                    {
                        label: 'Вид',
                        icon: 'pi pi-fw pi-list'
                    },
                    {
                        label: 'Поиск',
                        icon: 'pi pi-fw pi-search'
                    }

                ]
            },
            {
                label: 'Доставка',
                items: [
                    {
                        label: 'Отслеживать',
                        icon: 'pi pi-fw pi-compass',

                    },
                    {
                        label: 'Карта',
                        icon: 'pi pi-fw pi-map-marker',

                    },
                    {
                        label: 'Управление',
                        icon: 'pi pi-fw pi-pencil'
                    }
                ]
            },
            {
                label: 'Профиль',
                items: [
                    {
                        label: 'Настройки',
                        icon: 'pi pi-fw pi-cog'
                    },
                    {
                        label: 'Оплата',
                        icon: 'pi pi-fw pi-file'
                    }
                ]
            }
        ];
    }

}
