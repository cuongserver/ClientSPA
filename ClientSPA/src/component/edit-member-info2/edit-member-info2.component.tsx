import React from 'react'
import { WithTranslation, withTranslation } from 'react-i18next'
import Cropper, { CropperProps } from 'react-easy-crop'
import { Area, MediaSize, Point } from 'react-easy-crop/types'
import { Button, InputLabel } from '@material-ui/core'

interface IProps extends WithTranslation {}
interface IState extends Partial<CropperProps> {}

class EditMemberInfoOrigin extends React.PureComponent<IProps, IState> {
	cropDiameter = 150
	domRef = React.createRef<Cropper>()
	constructor(props: IProps) {
		super(props)
		this.state = {
			image: undefined,
			cropShape: 'round',
			crop: {
				x: 0,
				y: 0,
			},
			aspect: 1 / 1,
			rotation: 0,
			minZoom: 1,
			maxZoom: 1,
		}
	}
	onCropChange = (crop: Point) => {
		const image = this.domRef.current!.imageRef!
		if (image.width <= this.cropDiameter && image.height <= this.cropDiameter)
			return
		this.setState({
			crop: crop,
		})
	}
	onCropComplete = async (croppedArea: Area, croppedAreaPixels: Area) => {
		await this.getCroppedImg(this.domRef.current!.imageRef!, croppedAreaPixels)
	}

	getRadianAngle = (degreeValue: number) => {
		return (degreeValue * Math.PI) / 180
	}

	getCroppedImg = async (
		imageSrc: HTMLImageElement,
		pixelCrop: Area,
		rotation: number = 0
	) => {
		const image = imageSrc
		const canvas = document.getElementById('avatarOutput')! as HTMLCanvasElement
		const ctx = canvas.getContext('2d')!

		const maxSize = Math.max(image.naturalWidth, image.naturalHeight)
		const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

		// set each dimensions to double largest dimension to allow for a safe area for the
		// image to rotate in without being clipped by canvas context
		canvas.width = safeArea
		canvas.height = safeArea

		// translate canvas context to a central location on image to allow rotating around the center.
		ctx.translate(safeArea / 2, safeArea / 2)
		ctx.rotate(this.getRadianAngle(rotation))
		ctx.translate(-safeArea / 2, -safeArea / 2)

		// draw rotated image and store data.
		ctx.drawImage(
			image,
			safeArea / 2 - image.naturalWidth / 2,
			safeArea / 2 - image.naturalHeight / 2
		)

		const data = ctx.getImageData(0, 0, safeArea, safeArea)

		// set canvas width to final desired crop size - this will clear existing context
		canvas.width = pixelCrop.width
		canvas.height = pixelCrop.height

		// paste generated rotate image with correct offsets for x,y crop values.
		ctx.putImageData(
			data,
			Math.round(0 - safeArea / 2 + image.naturalWidth * 0.5 - pixelCrop.x),
			Math.round(0 - safeArea / 2 + image.naturalHeight * 0.5 - pixelCrop.y)
		)
		ctx.fillStyle = '#fff'
		ctx.globalCompositeOperation = 'destination-in'
		ctx.beginPath()
		ctx.arc(
			canvas.height / 2,
			canvas.height / 2,
			canvas.height / 2,
			0,
			2 * Math.PI
		)
		ctx.closePath()
		ctx.fill()
		const data2 = canvas.toDataURL('image/*')
		canvas.width = this.cropDiameter
		canvas.height = this.cropDiameter
		const image2 = new Image()
		image2.onload = () => {
			ctx.drawImage(image2, 0, 0, canvas.width, canvas.height)
		}
		image2.src = data2
	}

	onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.currentTarget.files && e.currentTarget.files.length > 0) {
			const file = e.currentTarget.files[0]
			const imageDataUrl = (await this.readFile(file)) as string
			this.setState({
				image: imageDataUrl,
			})
		}
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onMediaLoadedHandler = (mediaSize: MediaSize) => {
		setTimeout(() =>
			this.setState({
				crop: {
					x: 0,
					y: 0,
				},
			})
		)
	}
	readFile = (file: File) => {
		return new Promise((resolve) => {
			const reader = new FileReader()
			reader.onloadend = () => {
				resolve(reader.result)
			}
			reader.readAsDataURL(file)
		})
	}
	render() {
		return (
			<React.Fragment>
				<div>
					<InputLabel>
						<Button variant="contained" component="span" color="primary">
							Upload
						</Button>
						<input
							type="file"
							accept="image/*"
							className="dis-none"
							onChange={this.onFileChange}
						/>
					</InputLabel>
				</div>
				<div
					style={{
						height: 400,
						width: 400,
						position: 'relative',
					}}
				>
					{this.state.image && (
						<Cropper
							image={this.state.image}
							crop={this.state.crop!}
							zoom={this.state.zoom}
							aspect={this.state.aspect}
							cropSize={{
								width: this.cropDiameter,
								height: this.cropDiameter,
							}}
							cropShape={this.state.cropShape}
							onCropChange={this.onCropChange}
							onCropComplete={this.onCropComplete}
							onMediaLoaded={this.onMediaLoadedHandler}
							ref={this.domRef}
						/>
					)}
				</div>
				<canvas id="avatarOutput"></canvas>
			</React.Fragment>
		)
	}
}

export default withTranslation(undefined, { withRef: true })(
	EditMemberInfoOrigin
)
