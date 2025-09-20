import { View, Image, TouchableOpacity, Text, FlatList } from 'react-native'
import { s } from './styles'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Filter } from '@/components/Filter'
import { FilterStatus } from '@/types/FilterStatus'
import { Item } from '@/components/Item'

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]
const ITEMS = [
  { id: '1', status: FilterStatus.DONE, description: 'comprar café' },
  { id: '2', status: FilterStatus.PENDING, description: 'comprar suco' },
]

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
        <FlatList
          data={ITEMS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item data={item} onStatus={() => {}} onRemove={() => {}} />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={s.separator}/>}
          contentContainerStyle={s.listContent}
          ListEmptyComponent={() => <Text style={s.empty}>Nenhum item aqui</Text>}
        />
      </View>
    </View>
  )
}
