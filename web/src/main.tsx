import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { debugData } from './utils/debugData';
import { isEnvBrowser } from './utils/misc';
import { HashRouter } from 'react-router-dom';
import { DoorColumn } from './store/doors';
import { TooltipProvider } from '@/components/modern-ui/tooltip';

debugData<DoorColumn[]>([
  {
    action: 'updateDoorData',
    data: [
      {
        name: 'Door name',
        passcode: 'Supersecret123',
        autolock: 300,
        id: 0,
        zone: 'Mission Row',
        characters: ['charid1', 'charid2'],
        groups: {
          ['police']: 0,
          ['ambulance']: 1,
        },
        items: [{ name: 'mrpd_key', metadata: 'lspd_key', remove: true }],
        lockpickDifficulty: [],
        lockSound: null,
        unlockSound: null,
        maxDistance: 15.2,
        state: true,
        doors: true,
        auto: true,
        lockpick: true,
        hideUi: true,
        doorRate: null,
        holdOpen: true,
      },
    ],
  },
]);

debugData(
  [
    {
      action: 'updateDoorData',
      data: {
        [0]: {
          name: 'New door',
          passcode: 'Supersecret123',
          autolock: 300,
          id: 2,
          zone: 'Mission Row',
          characters: ['charid1', 'charid2'],
          groups: {
            ['police']: 0,
            ['ambulance']: 1,
          },
          items: [{ name: 'mrpd_key', metadata: 'lspd_key', remove: true }],
          lockSound: null,
          unlockSound: null,
          maxDistance: 15.2,
          state: true,
          doors: true,
          auto: true,
          lockpick: true,
          hideUi: true,
          doorRate: null,
          holdOpen: true,
        },
        [1]: {
          name: 'New door',
          passcode: 'Supersecret123',
          autolock: 300,
          id: 2,
          zone: 'Mission Row',
          characters: ['charid1', 'charid2'],
          groups: {
            ['police']: 0,
            ['ambulance']: 1,
          },
          items: [{ name: 'mrpd_key', metadata: 'lspd_key', remove: true }],
          lockSound: null,
          unlockSound: null,
          maxDistance: 15.2,
          state: true,
          doors: true,
          auto: true,
          lockpick: true,
          hideUi: true,
          doorRate: null,
          holdOpen: true,
        },
        [2]: {
          name: 'New door',
          passcode: 'Supersecret123',
          autolock: 300,
          id: 2,
          zone: 'Mission Row',
          characters: ['charid1', 'charid2'],
          groups: {
            ['police']: 0,
            ['ambulance']: 1,
          },
          items: [{ name: 'mrpd_key', metadata: 'lspd_key', remove: true }],
          lockSound: null,
          unlockSound: null,
          maxDistance: 15.2,
          state: true,
          doors: true,
          auto: true,
          lockpick: true,
          hideUi: true,
          doorRate: null,
          holdOpen: true,
        },
        [3]: {
          name: 'New door',
          passcode: 'Supersecret123',
          autolock: 300,
          id: 2,
          zone: 'Mission Row',
          characters: ['charid1', 'charid2'],
          groups: {
            ['police']: 0,
            ['ambulance']: 1,
          },
          items: [{ name: 'mrpd_key', metadata: 'lspd_key', remove: true }],
          lockSound: null,
          unlockSound: null,
          maxDistance: 15.2,
          state: true,
          doors: true,
          auto: true,
          lockpick: true,
          hideUi: true,
          doorRate: null,
          holdOpen: true,
        },
        [4]: {
          name: 'New door',
          passcode: 'Supersecret123',
          autolock: 300,
          id: 2,
          zone: 'Mission Row',
          characters: ['charid1', 'charid2'],
          groups: {
            ['police']: 0,
            ['ambulance']: 1,
          },
          items: [{ name: 'mrpd_key', metadata: 'lspd_key', remove: true }],
          lockSound: null,
          unlockSound: null,
          maxDistance: 15.2,
          state: true,
          doors: true,
          auto: true,
          lockpick: true,
          hideUi: true,
          doorRate: null,
          holdOpen: true,
        },
        [5]: {
          name: 'New door',
          passcode: 'Supersecret123',
          autolock: 300,
          id: 2,
          zone: 'Mission Row',
          characters: ['charid1', 'charid2'],
          groups: {
            ['police']: 0,
            ['ambulance']: 1,
          },
          items: [{ name: 'mrpd_key', metadata: 'lspd_key', remove: true }],
          lockSound: null,
          unlockSound: null,
          maxDistance: 15.2,
          state: true,
          doors: true,
          auto: true,
          lockpick: true,
          hideUi: true,
          doorRate: null,
          holdOpen: true,
        },
        [6]: {
          name: 'New door',
          passcode: 'Supersecret123',
          autolock: 300,
          id: 2,
          zone: 'Mission Row',
          characters: ['charid1', 'charid2'],
          groups: {
            ['police']: 0,
            ['ambulance']: 1,
          },
          items: [{ name: 'mrpd_key', metadata: 'lspd_key', remove: true }],
          lockSound: null,
          unlockSound: null,
          maxDistance: 15.2,
          state: true,
          doors: true,
          auto: true,
          lockpick: true,
          hideUi: true,
          doorRate: null,
          holdOpen: true,
        },
        [7]: {
          name: 'New door',
          passcode: 'Supersecret123',
          autolock: 300,
          id: 2,
          zone: 'Mission Row',
          characters: ['charid1', 'charid2'],
          groups: {
            ['police']: 0,
            ['ambulance']: 1,
          },
          items: [{ name: 'mrpd_key', metadata: 'lspd_key', remove: true }],
          lockSound: null,
          unlockSound: null,
          maxDistance: 15.2,
          state: true,
          doors: true,
          auto: true,
          lockpick: true,
          hideUi: true,
          doorRate: null,
          holdOpen: true,
        },
        [8]: {
          name: 'New door',
          passcode: 'Supersecret123',
          autolock: 300,
          id: 2,
          zone: 'Mission Row',
          characters: ['charid1', 'charid2'],
          groups: {
            ['police']: 0,
            ['ambulance']: 1,
          },
          items: [{ name: 'mrpd_key', metadata: 'lspd_key', remove: true }],
          lockSound: null,
          unlockSound: null,
          maxDistance: 15.2,
          state: true,
          doors: true,
          auto: true,
          lockpick: true,
          hideUi: true,
          doorRate: null,
          holdOpen: true,
        },
        [9]: {
          name: 'New door',
          passcode: 'Supersecret123',
          autolock: 300,
          id: 2,
          zone: 'Mission Row',
          characters: ['charid1', 'charid2'],
          groups: {
            ['police']: 0,
            ['ambulance']: 1,
          },
          items: [{ name: 'mrpd_key', metadata: 'lspd_key', remove: true }],
          lockSound: null,
          unlockSound: null,
          maxDistance: 15.2,
          state: true,
          doors: true,
          auto: true,
          lockpick: true,
          hideUi: true,
          doorRate: null,
          holdOpen: true,
        },
        [10]: {
          name: 'New door',
          passcode: 'Supersecret123',
          autolock: 300,
          id: 2,
          zone: 'Mission Row',
          characters: ['charid1', 'charid2'],
          groups: {
            ['police']: 0,
            ['ambulance']: 1,
          },
          items: [{ name: 'mrpd_key', metadata: 'lspd_key', remove: true }],
          lockSound: null,
          unlockSound: null,
          maxDistance: 15.2,
          state: true,
          doors: true,
          auto: true,
          lockpick: true,
          hideUi: true,
          doorRate: null,
          holdOpen: true,
        },
      },
    },
  ],
  3000
);

debugData(
  [
    {
      action: 'setVisible',
      data: undefined,
    },
  ],
  2000
);

debugData<string[]>([
  {
    action: 'setSoundFiles',
    data: ['button-remote', 'door-bolt-4', 'metal-locker', 'metallic-creak'],
  },
]);

const root = document.getElementById('root')!;

document.documentElement.classList.add('dark');

if (isEnvBrowser()) {
  root.style.backgroundImage = 'url("https://i.imgur.com/3pzRj9n.png")';
  root.style.backgroundSize = 'cover';
  root.style.backgroundRepeat = 'no-repeat';
  root.style.backgroundPosition = 'center';
}

createRoot(root).render(
  <React.StrictMode>
    <TooltipProvider delayDuration={200}>
      <HashRouter>
        <App />
      </HashRouter>
    </TooltipProvider>
  </React.StrictMode>
);
