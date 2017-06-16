<?php

class Endorsed_model extends CI_Model {

    /**
    * Responsable for auto load the database
    * @return void
    */
    public function __construct()
    {
        $this->load->database();
    }

    public function get_endorsed_business($user_id)
    {
        # code...
        $this->db->select('*');
        $this->db->from('endorse_business');
        $this->db->where('endorse_business.endorser_id', $user_id);
        $this->db->join('business', 'endorse_business.business_id = business._id');
        $this->db->join('users', 'users._id = endorse_business.provider_id');
        $query = $this->db->get();
        if(($query->num_rows()>0)){
            return $query->result();            
        }else{
            return array();
        }
    }        

    public function check_duplicate($cond)
    {
        $this->db->where('business_id',$cond['business_id']);
        $this->db->where('endorser_id',$cond['endorser_id']);
        $this->db->where('provider_id',$cond['provider_id']);
        $query = $this->db->get('endorse_business');
        if($query->num_rows()>0)
            return TRUE;
        return FALSE;
    }

    public function add_endorse($data)
    {
        $insert = $this->db->insert('endorse_business',$data);
        return $insert;
    }
}

