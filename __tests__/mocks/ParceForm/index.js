const FontAwesomeIcon = {
    template: '<span>Font Awesome Icon</span>',
};

const defaultMock = {
    global: {
      components: {
        'font-awesome-icon': FontAwesomeIcon,
      },
      mocks: {
        $router: {
          push: () => {}
        },
      },
    },
    props: {
      toggleParcelForm: () => {},
    },
}
  

export default defaultMock;
