import {
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
} from 'react-native'
import { s } from './styles'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Filter } from '@/components/Filter'
import { FilterStatus } from '@/types/FilterStatus'
import { Item } from '@/components/Item'
import { useEffect, useState } from 'react'
import { itemStorage, ItemStorage } from '@/storage/itemsStorage'

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]
const ITEMS = [
  { id: '1', status: FilterStatus.DONE, description: 'comprar café' },
  { id: '2', status: FilterStatus.PENDING, description: 'comprar suco' },
]

export function Home() {
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.PENDING)
  const [description, setDescription] = useState('')
  const [items, setItems] = useState<ItemStorage[]>([])

  async function handleAdd() {
    if (!description.trim()) {
      return Alert.alert('Adcionar', 'Informe a descrição para adicionar')
    }

    const newItem = {
      id: Math.random().toString(35).substring(2),
      description,
      status: FilterStatus.PENDING,
    }

    await itemStorage.add(newItem)
    await getByStatus()

    Alert.alert('Adcionado', `Adicionado ${description}`)
    setFilter(FilterStatus.PENDING)
    setDescription('')
  }

  async function getByStatus() {
    try {
      const response = await itemStorage.getByStatus(filter)
      setItems(response)
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Não foi possivel filtrar os itens.')
    }
  }

  async function handleRemove(id: string) {
    try {
      await itemStorage.remove(id)
      await getByStatus()
    } catch (error) {
      console.log(error)
      Alert.alert('Remover', 'Não foi possivel remover.')
    }
  }

  async function onClear() {
    try {
      await itemStorage.clear()
      setItems([])
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Não foi possivel limpar.')
    }
  }

  function handleClear() {
    Alert.alert('Limpar', 'Deseja remover todos?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => onClear(),
      },
    ])
  }

  async function handleToggleItemsStatus(id: string) {
    try {
      await itemStorage.toggleStatus(id)
      await getByStatus()
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Não foi possivel atualizar o status')
    }
  }

  useEffect(() => {
    getByStatus()
  }, [filter])

  return (
    <View style={s.container}>
      <Image source={require('@/assets/logo.png')} style={s.logo} />

      <View style={s.form}>
        <Input
          value={description}
          onChangeText={setDescription}
          placeholder="O que você precisa comprar?"
        />
        <Button onPress={handleAdd} title="Adicionar" />
      </View>

      <View style={s.content}>
        <View style={s.header}>
          {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              isActive={status === filter}
              onPress={() => setFilter(status)}
            />
          ))}
          <TouchableOpacity style={s.clearButton} onPress={handleClear}>
            <Text style={s.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onStatus={() => handleToggleItemsStatus(item.id)}
              onRemove={() => handleRemove(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={s.separator} />}
          contentContainerStyle={s.listContent}
          ListEmptyComponent={() => (
            <Text style={s.empty}>Nenhum item aqui</Text>
          )}
        />
      </View>
    </View>
  )
}
