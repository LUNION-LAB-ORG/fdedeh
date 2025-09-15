import {withNextVideo} from "next-video/process";
import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "api.lorem.space",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
			},
			{
				protocol: "https",
				hostname: "a0.muscache.com",
			},
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
			},
			{
				protocol: "https",
				hostname: "i.pravatar.cc",
			},
			{
				protocol: "https",
				hostname: "admin.fdedeh.info",
			},
            {
                protocol: "https",
                hostname: "admin.fdedeh.info",
            }
		],
	},
};

export default withNextVideo(withNextIntl(nextConfig));