# Portfolio presentation

Use the default Academic Pages template: a compact top navigation, an author sidebar with the uploaded headshot and profile links, and readable content pages in light and dark themes.

Keep upstream layouts and Sass as the base. Add only the styles needed by the retained portfolio components in `assets/css/portfolio.css`: year-grouped work lists, project summaries and thumbnails, action links, entry facts, the gallery and its native dialog. Keep the original inline icons and gallery captions.

The home page contains the existing biography. Talks, Publications, Patents, Tutorials, Projects, Teaching and Gallery remain separate sections. Do not import demonstration publications, sample biographies or invented qualifications from the template.

Profile links use the existing `social.links` configuration and keep their URLs and labels. Crop the original photograph in CSS, retaining the uploaded file and all earlier image assets.

Maintain readable contrast, visible keyboard focus, a skip link, labelled navigation and disclosure buttons, descriptive image alternatives, and gallery keyboard controls. Check 1280×800 desktop and 412×915 mobile layouts, including both themes, with no horizontal overflow. Respect reduced motion when styling custom components.

The previous custom typography and animated background are no longer active. Their assets remain preserved in the repository.
