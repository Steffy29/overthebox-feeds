/* eslint-disable no-undef */
function listWanIntf(listIntf) {
  return listIntf ? listIntf.map((intf) => m('p', [
    m('b', intf.name),
    m('.ip', intf.ip),
  ])) : undefined;
}

function displayAuthRequest(register) {
  return [
    m('p', m.trust('<b>This device is not associated with any service.</b><br>'
            + 'Please register it on the <a href="https://www.ovhtelecom.fr/manager/#/overTheBox/">manager</a>.<br>'
            + 'Then confirm the service ID here.')),
    m('.c', m('input[type=text][placeholder=Enter your service ID][size=47][maxlength=47][id=service].mono')),
    m('.c', m('button', { onclick: register }, 'Register')),
  ];
}

const OTBWebComponent = {
  call(method, url) {
    return m.request({
      method,
      url: `/cgi-bin/me/${url || ''}`,
    }).then((x) => {
      OTBWebComponent.device = x.device;
      OTBWebComponent.service = x.service;
      OTBWebComponent.version = x.version;
      OTBWebComponent.dns = x.dns;
      OTBWebComponent.localIpListToWan = x.localIpListToWan;
      OTBWebComponent.tunnelStatus = x.tunnelStatus;
    });
  },
  oninit() {
    return OTBWebComponent.call('GET');
  },
  register() {
    return OTBWebComponent.call('POST', document.getElementById('service').value);
  },
  view() {
    return [
      m('h1.c', 'OverTheBox'),
      m('.box', typeof OTBWebComponent.device === 'string' ? [
        OTBWebComponent.service.length > 0 ? [
          m('p', [
            m('b', 'Service'),
            m('.mono', OTBWebComponent.service),
          ]),
          m('p', [
            m('b', 'Tunnel status'),
            m('.tunnelStatus', OTBWebComponent.tunnelStatus && OTBWebComponent.tunnelStatus !== 0 ? 'Up' : 'Down'),
          ]),
        ] : [
          m('.authRequest', displayAuthRequest(OTBWebComponent.register)),
        ],
        m('p', [
          m('b', 'Device'),
          m('.mono', OTBWebComponent.device),
        ]),
      ] : m('p.c', 'The OverTheBox is registering to our servers ...')),
      m('p', [
        m('b', 'Local IP to WAN'),
        m('ul', listWanIntf(OTBWebComponent.localIpListToWan)),
      ]),
      m('p', [
        m('b', 'Dns servers'),
        m('.dns', OTBWebComponent.dns || 'unknown dns servers'),
      ]),
      m('img.logo', { src: 'logo.png' }),
      m('.version', OTBWebComponent.version || 'unknown version'),
    ];
  },
};

m.route(document.body, '/', {
  '/': OTBWebComponent,
});
