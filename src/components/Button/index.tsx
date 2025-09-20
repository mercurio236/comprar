import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { s } from './styles'

type Props = TouchableOpacityProps & {
  title: string
}

export function Button({ title, ...rest }: Readonly<Props>) {
  return (
    <TouchableOpacity style={s.container} activeOpacity={0.8} {...rest}>
      <Text style={s.title}>{title}</Text>
    </TouchableOpacity>
  )
}
