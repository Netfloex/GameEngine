import styles from "./Selector.module.scss"

import Image from "next/image"
import Link from "next/link"
import type { FC } from "react"

const Page: FC = () => {
	return (
		<>
			<div className={styles.wrapper}>
				<Link href={"/playground"}>
					<div className={styles.card}>
						<h1>Playground</h1>
						<div>
							<Image
								src="/preview/playground.png"
								priority
								alt=""
								width={400}
								height={400}
							/>
						</div>
					</div>
				</Link>
				<Link href={"/flappy"}>
					<div className={styles.card}>
						<h1>Flappy</h1>

						<div>
							<Image
								src="/preview/flappy.png"
								priority
								alt=""
								width={400}
								height={400}
							/>
						</div>
					</div>
				</Link>
			</div>
		</>
	)
}

export default Page
