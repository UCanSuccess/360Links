<?php

class Business_model extends CI_Model {

    /**
    * Responsable for auto load the database
    * @return void
    */
    public function __construct()
    {
        $this->load->database();
    }

    public function get_business_list()
    {
        # code...
        $query = $this->db->get('business');
        if(($query->num_rows()>0)){
            return $query->result();    
        }else{
            return array();
        }   
    }     

    public function get_business_detail($business_id)
    {
        $this->db->where('_id', $business_id);
        $query = $this->db->get('business');
        if(($query->num_rows()>0)){
            return $query->row();    
        }else{
            return array();
        }  
    }

    public function update_business($business_id, $data)
    {
        $this->db->where('_id', $business_id);
        $udpate = $this->db->update('business', $data);
        return $udpate;
    }

    public function insert_business($busi_name, $busi_desc)
    {
        $insert = $this->db->insert('business', array('business_name'=>$busi_name, 'business_desc'=>$busi_desc));
        return $this->db->insert_id();
    }
}

