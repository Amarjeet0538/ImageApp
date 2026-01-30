import Parameters from "../Parameters"

const ImageEditor = () => {
  return (
    <div className="flex flex-col gap-4 items-start">
      <Parameters name={"Brightness"}/>
      <Parameters name={"Contrast"}/>
      <Parameters name={"Saturation"}/>
      <Parameters name={"Crop"}/>
      <Parameters name={"Rotate"}/>

    </div>
  )
}

export default ImageEditor