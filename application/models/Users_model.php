<?php

class Users_model extends CI_Model {

    /**
    * Responsable for auto load the database
    * @return void
    */
    public function __construct()
    {
        $this->load->database();
    }

    public function get_user_info($user_id)
    {
        # code...
        $this->db->where('_id', $user_id);
        $query = $this->db->get('users');
        if(($query->num_rows()>0)){
            return $query->row();            
        }else{
            return array();
        }
    }

    public function get_outbisuness_providers($business_id)
    {
        # code...
        $qu = 'SELECT users.* FROM users WHERE users._id NOT IN (SELECT providers.user_id FROM providers WHERE providers.business_id = '.$business_id.')';
        $query = $this->db->query($qu);
        if(($query->num_rows()>0)){
            return $query->result();            
        }else{
            return array();
        }
    }

    public function get_users_out_me($user_id)
    {
        $this->db->where('_id !=', $user_id);
        $query = $this->db->get('users');
        if(($query->num_rows()>0)){
            return $query->result();            
        }else{
            return array();
        }
    }

    public function login($loginInfo)
    {
        $this->db->where('token',$loginInfo['token']);
        $result = $this->db->get('users');
        if($result->num_rows()){
            return $result->row('_id');
        }else{
            $this->db->insert('users', $loginInfo);
            return $this->db->insert_id();
        }
    }

    public function admin_login($username, $password){
        $this->db->where('user_name', $username);
        $this->db->where('password', md5($password));
        $result = $this->db->get('managers');
        if($result->num_rows())
            return TRUE;
        return FALSE;
    }
}

