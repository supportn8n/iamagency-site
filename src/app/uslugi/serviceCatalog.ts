export type ServiceCatalogItem = {
  number: string;
  id: string;
  title: string;
  text: string;
  href: string;
  linkLabel: string;
};

export const SERVICE_CATALOG: ServiceCatalogItem[] = [
  {
    number: "01",
    id: "brendbuk-i-smm-strategiya",
    title: "Брендбук и SMM-стратегия",
    text: "Фундамент коммуникации бренда: позиционирование, тон общения, визуальная система и правила контента. На выходе вы получаете понятную систему, по которой команда сможет вести соцсети без хаоса.",
    href: "/uslugi/brendbuk-i-smm-strategiya",
    linkLabel: "Подробнее об услуге",
  },
  {
    number: "02",
    id: "vedenie-sotssetey",
    title: "Ведение соцсетей",
    text: "Ведём соцсети под ключ: стратегия, контент, оформление и регулярные публикации. Работу адаптируем под конкретную площадку, аудиторию и задачи бизнеса.",
    href: "/uslugi/vedenie-sotssetey",
    linkLabel: "Подробнее об услуге",
  },
  {
    number: "03",
    id: "marketing-i-prodvizhenie",
    title: "Маркетинг и продвижение",
    text: "Привлекаем новую аудиторию и заявки через рекламу, посевы, спецпроекты и другие каналы продвижения. Подбираем инструменты под цели и бюджет проекта.",
    href: "/uslugi/marketing-i-prodvizhenie",
    linkLabel: "Подробнее об услуге",
  },
  {
    number: "04",
    id: "sozdanie-saitov",
    title: "Создание сайтов",
    text: "Разрабатываем корпоративные сайты, лендинги и интернет-магазины: от структуры и прототипа до дизайна, вёрстки и запуска.",
    href: "/marketing",
    linkLabel: "Смотреть направление",
  },
  {
    number: "05",
    id: "kontent-syomki",
    title: "Контент / Съёмки",
    text: "Создаём фото и видео для соцсетей, брендов и мероприятий: съёмка, монтаж и готовые материалы для регулярного контента.",
    href: "/uslugi/kontent-syomki",
    linkLabel: "Подробнее об услуге",
  },
];
