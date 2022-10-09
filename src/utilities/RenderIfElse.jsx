const RenderIfElse = ({children,isTrue,isFalse})=>{
  return isTrue ? children: isFalse
}
export default RenderIfElse;