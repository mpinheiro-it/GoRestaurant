import { useState, useEffect } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food, {FoodType} from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';



function Dashboard() {
  const [foods, setFoods] = useState<FoodType[]>([]);
  const [editingFood, setEditingFood] = useState({} as FoodType);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     foods: [],
  //     editingFood: {},
  //     modalOpen: false,
  //     editModalOpen: false,
  //   }
  // }
  useEffect(() => {

    async function loadFoods() {
      const response = await api.get('/foods');  
      //this.setState({ foods: response.data });
      setFoods(response.data)
    }    

    loadFoods()
  },[]);
  

  async function handleAddFood(food: FoodType) {    

    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  
  async function handleUpdateFood(food: FoodType) {    

    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      //this.setState({ foods: foodsUpdated });
      setFoods(foodsUpdated)

    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(id: number){

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
    //this.setState({ foods: foodsFiltered });
  }

  function toggleModal(){    
    setModalOpen(!modalOpen);
    //this.setState({ modalOpen: !modalOpen });
  }

  function toggleEditModal() {    
    setEditModalOpen(!editModalOpen);
    //this.setState({ editModalOpen: !editModalOpen });
  }

  function handleEditFood(food:FoodType){
    setEditingFood(food);
    setEditModalOpen(true);
    //this.setState({ editingFood: food, editModalOpen: true });
  }

  // render() {
  //   const { modalOpen, editModalOpen, editingFood, foods } = this.state;

    return (
      <>
        <Header openModal={toggleModal} />
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
        />
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map(food => (
              <Food
                key={food.id}
                food={food}
                handleDelete={handleDeleteFood}
                handleEditFood={handleEditFood}
              />
            ))}
        </FoodsContainer>
      </>
    );
  }
// };

export default Dashboard;
