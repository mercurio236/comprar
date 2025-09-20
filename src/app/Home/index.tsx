import { View, Image } from 'react-native'
import { s } from './styles'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'


export function Home() {
  return (
    <View style={s.container}>
      <Image source={require('@/assets/logo.png')} style={s.logo} />

      <View style={s.form}>
        <Input placeholder="O que você precisa comprar?" />
        <Button title="Adicionar" />
      </View>

      <View style={s.content}>
      
      </View>
    </View>
  )
}
