import { View, Image, TouchableOpacity, Text } from 'react-native'
import { s } from './styles'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Filter } from '@/components/Filter'
import { FilterStatus } from '@/types/FilterStatus'

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

export function Home() {
  return (
    <View style={s.container}>
      <Image source={require('@/assets/logo.png')} style={s.logo} />

      <View style={s.form}>
        <Input placeholder="O que você precisa comprar?" />
        <Button title="Adicionar" />
      </View>

      <View style={s.content}>
        <View style={s.header}>
          {FILTER_STATUS.map((status) => (
            <Filter key={status} status={status} isActive />
          ))}
          <TouchableOpacity style={s.clearButton}>
            <Text style={s.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
