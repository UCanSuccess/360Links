<?php

class Service_verify extends CI_Model {

    /**
    * Responsable for auto load the database
    * @return void
    */
    public function __construct()
    {
        $this->load->database();
    }

    public function add_request($input_data)
    {
        $result = $this->db->insert('service_verify', $input_data);
        return $result;
    }

    public function get_verify_list()
    {
        $query = 'SELECT t1.*, users.name AS receiver_name, users.profile_url AS receiver_profile, business.business_name FROM (SELECT service_verify.*, users.name AS provider_name, users.profile_url AS provider_profile FROM service_verify LEFT JOIN users ON users._id = service_verify.provider) AS t1 LEFT JOIN (users, business) ON users._id = t1.receiver AND business._id = t1.business_id';
        $result = $this->db->query($query);
        if($result->num_rows()){
            return $result->result();
        }else{
            return NULL;
        }
    }

    public function get_verify_detail($id)
    {
        $query = 'SELECT t1.*, users.name AS receiver_name, users.profile_url AS receiver_profile, business.business_name FROM (SELECT service_verify.*, users.name AS provider_name, users.profile_url AS provider_profile FROM service_verify LEFT JOIN users ON users._id = service_verify.provider) AS t1 LEFT JOIN (users, business) ON users._id = t1.receiver AND business._id = t1.business_id WHERE t1._id = '.$id;
        $result = $this->db->query($query);
        if($result->num_rows()){
            return $result->row();
        }else{
            return NULL;
        }
    }

    public function update_verify($id, $data)
    {
        $this->db->where('_id', $id);
        $result = $this->db->update('service_verify', $data);
        return $result;
    }

    public function get_rate($user_id, $business_id)
    {
        $query = 'SELECT AVG(rate) as avg_rate FROM service_verify WHERE provider = '.$user_id.' AND business_id = '.$business_id.' GROUP BY provider';
        $result = $this->db->query($query);
        if($result->num_rows()){
            return $result->row('avg_rate');
        }else{
            return 0;
        }
    }
}

