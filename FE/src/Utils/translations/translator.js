import {useTranslation} from 'react-i18next';

const translator = (key) => {
	// try {
		const { t } = useTranslation();
		return t(key) || key;
	// } catch (e) {}
};

export default translator;