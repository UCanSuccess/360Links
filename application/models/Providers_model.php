<?php

class Providers_model extends CI_Model {

    /**
    * Responsable for auto load the database
    * @return void
    */
    public function __construct()
    {
        $this->load->database();
    }

    public function get_provide_business($user_id)
    {
        # code...
        $this->db->select('*');
        $this->db->from('providers');
        $this->db->where('providers.user_id', $user_id);
        $this->db->join('business', 'providers.business_id = business._id');
        $query = $this->db->get();
        if(($query->num_rows()>0)){
            return $query->result();            
        }else{
            return array();
        }
    }        

    public function searchProviders($user_id, $business_id)
    {
        # code...
        $this->db->select('*');
        $this->db->from('providers');
        $this->db->where('providers.user_id !=', $user_id);
        $this->db->where('providers.business_id', $business_id);
        $this->db->join('users', 'providers.user_id = users._id');
        $query = $this->db->get();
        if(($query->num_rows()>0)){
            return $query->result();            
        }else{
            return array();
        }
    }

    public function get_business_providers($business_id)
    {
        # code...
        $this->db->select('*');
        $this->db->from('providers');
        $this->db->where('providers.business_id', $business_id);
        $this->db->join('users', 'providers.user_id = users._id');
        $query = $this->db->get();
        if(($query->num_rows()>0)){
            return $query->result();            
        }else{
            return array();
        }
    }

    public function remove_providers_list($remove_list)
    {
        if(count($remove_list)){
            foreach ($remove_list as $key => $value) {
                # code...
                $this->db->where('_id', $value);
                $this->db->delete('providers');
            }
            return TRUE;
        }else{
            return FALSE;
        }
    }

    public function add_providers_list($business_id, $add_list)
    {
        if(count($add_list)){
            foreach ($add_list as $key => $value) {
                # code...
                $temp = array(
                        'user_id'=>$value,
                        'business_id'=>$business_id
                    );
                $this->db->insert('providers', $temp);
            }
            return TRUE;
        }else{
            return FALSE;
        }
    }
}

