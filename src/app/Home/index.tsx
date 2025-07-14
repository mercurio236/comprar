import { View, Image } from 'react-native'
import { s } from './styles'

export function Home() {
  return (
    <View style={s.container}>
      <Image source={require('@/assets/logo.png')} style={s.logo}/>
    </View>
  )
}
