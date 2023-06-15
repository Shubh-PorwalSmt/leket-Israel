import {useTranslation} from 'react-i18next';

const translator = (key) => {
	const { t } = useTranslation();
	return t(key) || key;
};

export default translator;