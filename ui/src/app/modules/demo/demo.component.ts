import {Component, Renderer2, ViewChild} from '@angular/core';
import {filter, Subscription} from "rxjs";
import {SidebarComponent} from "../pages/components/sidebar/sidebar.component";
import {TopbarComponent} from "../pages/components/topbar/topbar.component";
import {LayoutService} from "../../services/layout.service";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent {
  pageMenu: any[] = [
          {
              label: 'Home',
              items: [
                  { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
              ]
          },
          {
              label: 'UI Components',
              items: [
                  { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/demo/uikit/formlayout'] },
                  { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/demo/uikit/input'] },
                  { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/demo/uikit/floatlabel'] },
                  { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/demo/uikit/invalidstate'] },
                  { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/demo/uikit/button'] },
                  { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/demo/uikit/table'] },
                  { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/demo/uikit/list'] },
                  { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/demo/uikit/tree'] },
                  { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/demo/uikit/panel'] },
                  { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/demo/uikit/overlay'] },
                  { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/demo/uikit/media'] },
                  { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/demo/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },
                  { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/demo/uikit/message'] },
                  { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/demo/uikit/file'] },
                  { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/demo/uikit/charts'] },
                  { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/demo/uikit/misc'] }
              ]
          },
          {
              label: 'Prime Blocks',
              items: [
                  { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/demo/blocks'], badge: 'NEW' },
                  { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
              ]
          },
          {
              label: 'Utilities',
              items: [
                  { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/demo/utilities/icons'] },
                  { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
              ]
          },
          {
              label: 'Pages',
              icon: 'pi pi-fw pi-briefcase',
              items: [
                  {
                      label: 'Landing',
                      icon: 'pi pi-fw pi-globe',
                      routerLink: ['/demo/landing']
                  },
                  {
                      label: 'Auth',
                      icon: 'pi pi-fw pi-user',
                      items: [
                          {
                              label: 'Login',
                              icon: 'pi pi-fw pi-sign-in',
                              routerLink: ['/demo/auth/login']
                          },
                          {
                              label: 'Error',
                              icon: 'pi pi-fw pi-times-circle',
                              routerLink: ['/demo/auth/error']
                          },
                          {
                              label: 'Access Denied',
                              icon: 'pi pi-fw pi-lock',
                              routerLink: ['/demo/auth/access']
                          }
                      ]
                  },
                  {
                      label: 'Crud',
                      icon: 'pi pi-fw pi-pencil',
                      routerLink: ['/demo/pages/crud']
                  },
                  {
                      label: 'Timeline',
                      icon: 'pi pi-fw pi-calendar',
                      routerLink: ['/demo/pages/timeline']
                  },
                  {
                      label: 'Not Found',
                      icon: 'pi pi-fw pi-exclamation-circle',
                      routerLink: ['/demo/notfound']
                  },
                  {
                      label: 'Empty',
                      icon: 'pi pi-fw pi-circle-off',
                      routerLink: ['/demo/pages/empty']
                  },
              ]
          },
          {
              label: 'Hierarchy',
              items: [
                  {
                      label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
                      items: [
                          {
                              label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
                              items: [
                                  { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                                  { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                                  { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
                              ]
                          },
                          {
                              label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
                              items: [
                                  { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
                              ]
                          },
                      ]
                  },
                  {
                      label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
                      items: [
                          {
                              label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
                              items: [
                                  { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                  { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
                              ]
                          },
                          {
                              label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
                              items: [
                                  { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
                              ]
                          },
                      ]
                  }
              ]
          },
          {
              label: 'Get Started',
              items: [
                  {
                      label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/demo/documentation']
                  },
                  {
                      label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
                  }
              ]
          }
      ];
    overlayMenuOpenSubscription: Subscription;
    menuOutsideClickListener: any;
    profileMenuOutsideClickListener: any;
    @ViewChild(SidebarComponent) appSidebar!: SidebarComponent;
    @ViewChild(TopbarComponent) appTopbar!: TopbarComponent;

    constructor(public layoutService: LayoutService, public renderer: Renderer2, public router: Router) {
        this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
            if (!this.menuOutsideClickListener) {
                this.menuOutsideClickListener = this.renderer.listen('document', 'click', event => {
                    const isOutsideClicked = !(this.appSidebar.el.nativeElement.isSameNode(event.target) || this.appSidebar.el.nativeElement.contains(event.target)
                        || this.appTopbar.menuButton.nativeElement.isSameNode(event.target) || this.appTopbar.menuButton.nativeElement.contains(event.target));

                    if (isOutsideClicked) {
                        this.hideMenu();
                    }
                });
            }

            if (!this.profileMenuOutsideClickListener) {
                this.profileMenuOutsideClickListener = this.renderer.listen('document', 'click', event => {
                    const isOutsideClicked = !(this.appTopbar.menu.nativeElement.isSameNode(event.target) || this.appTopbar.menu.nativeElement.contains(event.target)
                        || this.appTopbar.topbarMenuButton.nativeElement.isSameNode(event.target) || this.appTopbar.topbarMenuButton.nativeElement.contains(event.target));

                    if (isOutsideClicked) {
                        this.hideProfileMenu();
                    }
                });
            }

            if (this.layoutService.state.staticMenuMobileActive) {
                this.blockBodyScroll();
            }
        });

        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.hideMenu();
                this.hideProfileMenu();
            });
    }

    hideMenu() {
        this.layoutService.state.overlayMenuActive = false;
        this.layoutService.state.staticMenuMobileActive = false;
        this.layoutService.state.menuHoverActive = false;
        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
            this.menuOutsideClickListener = null;
        }
        this.unblockBodyScroll();
    }

    hideProfileMenu() {
        this.layoutService.state.profileSidebarVisible = false;
        if (this.profileMenuOutsideClickListener) {
            this.profileMenuOutsideClickListener();
            this.profileMenuOutsideClickListener = null;
        }
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        }
        else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        }
        else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    get containerClass() {
        return {
            'layout-theme-light': this.layoutService.config.colorScheme === 'light',
            'layout-theme-dark': this.layoutService.config.colorScheme === 'dark',
            'layout-overlay': this.layoutService.config.menuMode === 'overlay',
            'layout-static': this.layoutService.config.menuMode === 'static',
            'layout-static-inactive': this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config.menuMode === 'static',
            'layout-overlay-active': this.layoutService.state.overlayMenuActive,
            'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
            'p-input-filled': this.layoutService.config.inputStyle === 'filled',
            'p-ripple-disabled': !this.layoutService.config.ripple
        }
    }

    ngOnDestroy() {
        if (this.overlayMenuOpenSubscription) {
            this.overlayMenuOpenSubscription.unsubscribe();
        }

        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
        }
    }
}
