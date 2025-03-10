import { defineNuxtPlugin, useNuxtApp } from '#app'
import { localePlugin } from './plugins/dayjs/locale'
import { useDayjs } from '#imports'

export default defineNuxtPlugin({
	name: 'nuxt-dayjs-i18n-plugin',
	hooks: {
		'app:created'() {
			const nuxtApp = useNuxtApp()
			const { $i18n: i18n } = nuxtApp
			const dayjs = useDayjs()
			if (!dayjs) {
				throw new Error('nuxt-dayjs module not found')
			}
			if (!i18n) {
				throw new Error('@nuxtjs/i18n module not found')
			}

			const setLocale = dayjs.locale

			const { locale } = nuxtApp.$i18n
			if (locale.value !== dayjs.locale()) {
				dayjs.locale(locale.value)
			}

			dayjs.extend(localePlugin)

			nuxtApp.hook('i18n:beforeLocaleSwitch', ({ newLocale }) => {
				setLocale(newLocale)
			})
		},
	},
})
