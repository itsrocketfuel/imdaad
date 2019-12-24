import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'starter', name: 'List of Causes', type: 'link', icon: 'list' },
  { state: 'button', type: 'link', name: 'Reports', icon: 'report' },
  /*{ state: 'grid', type: 'link', name: 'Donate', icon: 'attach_money' }, HAS FIREBASE DEMO */
  { state: 'lists', type: 'link', name: 'Start a Cause', icon: 'fiber_new' },
  { state: 'menu', type: 'link', name: 'Manage', icon: 'assignment' },
  { state: 'tabs', type: 'link', name: 'Approve Drop-Offs', icon: 'done_outline' },
  { state: 'stepper', type: 'link', name: 'Add Drop-Off', icon: 'add_location' },
  /*{
    state: 'expansion',
    type: 'link',
    name: 'Under Development',
    icon: 'developer_mode'
  }*/
  /*{ state: 'chips', type: 'link', name: 'Chips', icon: 'vignette' },
  { state: 'toolbar', type: 'link', name: 'Toolbar', icon: 'voicemail' },
  {
    state: 'progress-snipper',
    type: 'link',
    name: 'Progress snipper',
    icon: 'border_horizontal'
  },
  {
    state: 'progress',
    type: 'link',
    name: 'Progress Bar',
    icon: 'blur_circular'
  },
  {
    state: 'dialog',
    type: 'link',
    name: 'Dialog',
    icon: 'assignment_turned_in'
  },
  { state: 'tooltip', type: 'link', name: 'Tooltip', icon: 'assistant' },
  { state: 'snackbar', type: 'link', name: 'Snackbar', icon: 'adb' },
  { state: 'slider', type: 'link', name: 'Slider', icon: 'developer_mode' },
  {
    state: 'slide-toggle',
    type: 'link',
    name: 'Slide Toggle',
    icon: 'all_inclusive'
  }*/
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
